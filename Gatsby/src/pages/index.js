import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../layouts/layout";
import CardGrid from "../components/card-grid";
import * as styles from "../styles/index.module.scss";
import { center } from "../styles/common.module.scss";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allGatsbyNews {
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
      <h1 className={center}>{data.site.siteMetadata.title}</h1>
      <CardGrid
        data={data.allGatsbyNews.nodes[0].articles
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
      <StaticImage
        src="../assets/images/news.jpg"
        alt="Noticias"
        placeholder="blurred"
        layout="constrained"
        className={styles.image}
        data-testid="static-image"
      />
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Noticias con Gatsby</title>;
