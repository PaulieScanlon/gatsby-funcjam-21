require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    url: ``,
    title: `Groovy Analytics`,
    image: ``,
    description: ``,
    language: ``,
    keywords: ``,
  },
  plugins: [
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-theme-ui`,
  ],
}