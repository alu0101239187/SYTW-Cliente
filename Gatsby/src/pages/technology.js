import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Layout from "../layouts/layout";
import CardGrid from "../components/card-grid";
import { center } from "../styles/common.module.scss";

const Technology = () => {
  const data = useStaticQuery(graphql`
    query {
      allTechnologyNews {
        nodes {
          articles {
            title
            description
            urlToImage
            publishedAt
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <h1 className={center}>Tecnología</h1>
      <CardGrid
        data={data.allTechnologyNews.nodes[0].articles
          .filter((article) => article.title !== "[Removed]")
          .slice(0, 3)
          .map((article) => {
            return {
              img: article.urlToImage,
              title: article.title,
              text: article.description,
              annotation:
                "Publicada hace " +
                Math.floor(
                  (new Date() - new Date(article.publishedAt)) / 86400000
                ) +
                " días",
              url:
                "/news/" +
                article.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, ""),
            };
          })}
      />
    </Layout>
  );
};

export const Head = () => <title>Tecnología</title>;

export default Technology;
