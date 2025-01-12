import * as React from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { QueryEngine } from "@comunica/query-sparql";

import { genres } from "./data/genres";
import { publishers } from "./data/publishers";
import VideogamesTable from "./components/videogames-table";

const App = () => {
  const [genre, setGenre] = React.useState("");
  const [publisher, setPublisher] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [rows, setRows] = React.useState([]);

  const myEngine = new QueryEngine();

  const auxRows = [];

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handlePublisherChange = (event) => {
    setPublisher(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    auxRows.length = 0;

    const bindingsStream = await myEngine.queryBindings(
      `
        PREFIX wd: <http://www.wikidata.org/entity/>
        PREFIX wdt: <http://www.wikidata.org/prop/direct/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX wikibase: <http://wikiba.se/ontology#>
        PREFIX bd: <http://www.bigdata.com/rdf#>
        
        SELECT ?item ?itemLabel 
          (MIN(?publicationDate) AS ?originalPublicationDate) 
          (GROUP_CONCAT(DISTINCT ?developerLabel; SEPARATOR=", ") AS ?developers) 
          (GROUP_CONCAT(DISTINCT ?directorLabel; SEPARATOR=", ") AS ?directors) 
          (GROUP_CONCAT(DISTINCT ?platformLabel; SEPARATOR=", ") AS ?platforms) 
          (GROUP_CONCAT(DISTINCT ?countryLabel; SEPARATOR=", ") AS ?countries) 
        WHERE {
          ?item wdt:P31 wd:Q7889.
          ?item wdt:P136 ?genre.
          ?item wdt:P123 ?publisher.
          
          VALUES ?genre { ${genre} }
          VALUES ?publisher { ${publisher} }

          OPTIONAL { 
            ?item wdt:P495 ?country.
            ?country rdfs:label ?countryLabel. 
            FILTER (lang(?countryLabel) = "es") 
          }
          OPTIONAL { 
            ?item wdt:P495 ?country.
            ?country rdfs:label ?countryLabel. 
            FILTER (lang(?countryLabel) = "en") 
          }
          
          OPTIONAL { 
            ?item wdt:P178 ?developer.
            ?developer rdfs:label ?developerLabel. 
            FILTER (lang(?developerLabel) = "es") 
          }
          OPTIONAL { 
            ?item wdt:P178 ?developer.
            ?developer rdfs:label ?developerLabel. 
            FILTER (lang(?developerLabel) = "en") 
          }
          
          OPTIONAL { 
            ?item wdt:P57 ?director.
            ?director rdfs:label ?directorLabel. 
            FILTER (lang(?directorLabel) = "es") 
          } 
          OPTIONAL { 
            ?item wdt:P57 ?director.
            ?director rdfs:label ?directorLabel. 
            FILTER (lang(?directorLabel) = "en") 
          }
          
          OPTIONAL { 
            ?item wdt:P400 ?platform.
            ?platform rdfs:label ?platformLabel. 
            FILTER (lang(?platformLabel) = "es") 
          }
          OPTIONAL { 
            ?item wdt:P400 ?platform.
            ?platform rdfs:label ?platformLabel. 
            FILTER (lang(?platformLabel) = "en") 
          }
          
          ?item wdt:P577 ?publicationDate.
          FILTER (?publicationDate  >= "${startDate}"^^xsd:dateTime && 
                  ?publicationDate  <= "${endDate}"^^xsd:dateTime)

          SERVICE wikibase:label { 
            bd:serviceParam wikibase:language "es,en". 
          }
        }
        GROUP BY ?item ?itemLabel
        ORDER BY ?originalPublicationDate`,
      {
        sources: ["https://query.wikidata.org/bigdata/namespace/wdq/sparql"],
      }
    );

    bindingsStream.on("data", (binding) => {
      auxRows.push({
        url: binding.entries._root.entries.find((entry) => {
          return entry[0] === "item";
        })[1].value,
        name: binding.entries._root.entries.find((entry) => {
          return entry[0] === "itemLabel";
        })[1].value,
        publicationDate: binding.entries._root.entries.find((entry) => {
          return entry[0] === "originalPublicationDate";
        })[1].value,
        developer: binding.entries._root.entries.find((entry) => {
          return entry[0] === "developers";
        })[1].value,
        director: binding.entries._root.entries.find((entry) => {
          return entry[0] === "directors";
        })[1].value,
        platform: binding.entries._root.entries.find((entry) => {
          return entry[0] === "platforms";
        })[1].value,
        country: binding.entries._root.entries.find((entry) => {
          return entry[0] === "countries";
        })[1].value,
      });
    });

    bindingsStream.on("end", () => {
      if (auxRows.length === 0) {
        auxRows.push({
          url: "",
          name: "No se encontraron resultados",
          publicationDate: "",
          developer: "",
          director: "",
          platform: "",
          country: "",
        });
      }
      setRows(auxRows);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={3}
          sx={{ paddingLeft: "100px", paddingRight: "100px" }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "500",
                marginTop: "20px",
                marginBottom: "5px",
                marginLeft: "10px",
              }}
            >
              Género
            </Typography>
            <FormControl fullWidth required>
              <Select
                displayEmpty
                value={genre}
                onChange={handleGenreChange}
                sx={{ backgroundColor: "white" }}
              >
                <MenuItem disabled value="">
                  -
                </MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre.name} value={genre.value}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "500",
                marginTop: "20px",
                marginBottom: "5px",
                marginLeft: "10px",
              }}
            >
              Editor
            </Typography>
            <FormControl fullWidth required>
              <Select
                displayEmpty
                value={publisher}
                onChange={handlePublisherChange}
                sx={{ backgroundColor: "white" }}
              >
                <MenuItem disabled value="">
                  -
                </MenuItem>
                {publishers.map((publisher) => (
                  <MenuItem key={publisher.name} value={publisher.value}>
                    {publisher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "500",
                marginTop: "5px",
                marginBottom: "5px",
                marginLeft: "10px",
              }}
            >
              Fecha inicial
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              sx={{
                backgroundColor: "white",
                borderRadius: "4px",
              }}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "500",
                marginTop: "5px",
                marginBottom: "5px",
                marginLeft: "10px",
              }}
            >
              Fecha final
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              sx={{
                backgroundColor: "white",
                borderRadius: "4px",
              }}
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "10px", padding: "10px" }}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </form>

      <VideogamesTable rows={rows} />
    </div>
  );
};

export default App;
