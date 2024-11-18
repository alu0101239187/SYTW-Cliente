const path = require("path");

const createSlug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allArticles {
        nodes {
          id
          title
          content
          urlToImage
          publishedAt
        }
      }
    }
  `);
  if (result.errors) {
    console.error(result.errors);
    throw result.errors;
  }

  const newsTemplate = path.resolve("src/templates/article-template.js");
  result.data.allArticles.nodes.forEach((article) => {
    if (!article.title == "[Removed]") {
      return;
    }
    const slug = createSlug(article.title);

    createPage({
      path: `/news/${slug}`,
      component: newsTemplate,
      context: {
        id: article.id,
        title: article.title,
      },
    });
  });
};
