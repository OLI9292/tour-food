module.exports = {
  siteMetadata: {
    title: `Tour Food`,
    description: `Great places for food and drink on tour!`,
    url: `https://tourfood.us`,
    image: `tour-food-icon.png`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tour Food`,
        short_name: `Tour Food`,
        start_url: `/`,
        background_color: `#FB6320`,
        theme_color: `#157EFB`,
        display: `fullscreen`,
        icon: `src/images/tour-food-icon-sq.png`,
        orientation: "portrait",
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-149155173-2",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
