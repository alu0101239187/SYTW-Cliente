/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: "Noticias con Gatsby",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-custom-api",
      options: {
        url: "https://newsapi.org/v2/everything?q=technology&apiKey=6361a77af3654592b97b82f15a76bd4f",
        rootKey: "technologyNews",
        schemas: {
          responses: `
            status: String
            totalResults: Int
            articles: [articles]
          `,
          articles: `
            source: source
            author: String
            title: String
            description: String
            url: String
            urlToImage: String
            publishedAt: Date
            content: String
          `,
          source: `
            id: String
            name: String
          `,
        },
      },
    },
    {
      resolve: "gatsby-source-custom-api",
      options: {
        url: "https://newsapi.org/v2/everything?q=ecology&apiKey=6361a77af3654592b97b82f15a76bd4f",
        rootKey: "ecologyNews",
        schemas: {
          responses: `
            status: String
            totalResults: Int
            articles: [articles]
          `,
          articles: `
            source: source
            author: String
            title: String
            description: String
            url: String
            urlToImage: String
            publishedAt: Date
            content: String
          `,
          source: `
            id: String
            name: String
          `,
        },
      },
    },
    {
      resolve: "gatsby-source-custom-api",
      options: {
        url: "https://newsapi.org/v2/everything?q=economy&apiKey=6361a77af3654592b97b82f15a76bd4f",
        rootKey: "economyNews",
        schemas: {
          responses: `
            status: String
            totalResults: Int
            articles: [articles]
          `,
          articles: `
            source: source
            author: String
            title: String
            description: String
            url: String
            urlToImage: String
            publishedAt: Date
            content: String
          `,
          source: `
            id: String
            name: String
          `,
        },
      },
    },
    {
      resolve: "gatsby-source-custom-api",
      options: {
        url: "https://newsapi.org/v2/everything?q=gatsby&apiKey=6361a77af3654592b97b82f15a76bd4f",
        rootKey: "gatsbyNews",
        schemas: {
          responses: `
            status: String
            totalResults: Int
            articles: [articles]
          `,
          articles: `
            source: source
            author: String
            title: String
            description: String
            url: String
            urlToImage: String
            publishedAt: Date
            content: String
          `,
          source: `
            id: String
            name: String
          `,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assessments`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-eslint`,
      options: {
        configType: "flat",
        extensions: ["js", "jsx"],
        exclude: ["node_modules", ".cache", "public"],
        stages: ["develop"],
      },
    },
  ],
};
