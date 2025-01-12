import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@mui/material";

const VideogamesTable = ({ rows }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: "50px", marginBottom: "50px" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Videojuego</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              Fecha de publicación
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Desarrollador</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Director</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Plataformas</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>País</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.url}>
              <TableCell>
                <Link
                  href={row.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{
                    all: "unset",
                    cursor: "pointer",
                  }}
                >
                  {row.name}
                </Link>
              </TableCell>
              <TableCell>{formatDate(row.publicationDate)}</TableCell>
              <TableCell>{row.developer}</TableCell>
              <TableCell>{row.director}</TableCell>
              <TableCell>{row.platform}</TableCell>
              <TableCell>{row.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VideogamesTable;
