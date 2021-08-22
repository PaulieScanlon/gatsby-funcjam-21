require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    url: `https://gatsbygroovyanalytics.gatsbyjs.io/`,
    title: `Groovy Analytics`,
    image: `https://gatsbygroovyanalytics.gatsbyjs.io/images/gatsby-groovy-google-analytics-og-image.jpg`,
    description: `Google Analytics | A #FuncJam site by @PaulieScanlon`,
    language: `en-gb`,
    keywords: [`gatsby`, `gatsby-functions`],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-react-helmet`,
  ],
}
