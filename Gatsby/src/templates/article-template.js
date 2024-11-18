import React from "react";
import { graphql } from "gatsby";
import Layout from "../layouts/layout";
import Card from "../components/card";
import CardGrid from "../components/card-grid";
import { center } from "../styles/common.module.scss";

const ArticleTemplate = ({ data }) => {
  const { title, content, urlToImage, publishedAt } = data.articles;

  return (
    <Layout>
      <h1 className={center}>{title}</h1>
      <Card
        img={urlToImage}
        title={title}
        text={content}
        annotation={
          "Publicada hace " +
          Math.floor((new Date() - new Date(publishedAt)) / 86400000) +
          " días"
        }
      />
      <h2 className={center}>Valoraciones</h2>
      <CardGrid
        data={data.allFile.nodes[0].childDataJson.assessments
          .slice(0, 4)
          .map((assessment) => {
            return {
              text: assessment.assessment,
              annotation: assessment.author,
            };
          })}
      />
    </Layout>
  );
};

export const query = graphql`
  query ($id: String!) {
    articles(id: { eq: $id }) {
      title
      content
      urlToImage
      publishedAt
    }
    allFile {
      nodes {
        childDataJson {
          assessments {
            assessment
            author
          }
        }
      }
    }
  }
`;

export const Head = ({ pageContext }) => {
  return <title>{pageContext.title}</title>;
};

export default ArticleTemplate;
