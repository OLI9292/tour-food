import React from "react"

import SEO from "../components/seo"
import HeaderComponent from "../components/header"

import { Box, Header, Text } from "../components/common"

import colors from "../lib/colors"

export default class FAQPage extends React.Component {
  render() {
    return (
      <Box>
        <SEO title="FAQ" />

        <HeaderComponent searchProps={{}} siteTitle="Tour Food" />

        <Header
          style={{ textAlign: "center", marginTop: "40px" }}
          color={colors.orange}
        >
          FAQ
        </Header>

        <Text
          small
          style={{ padding: "10px 40px", fontFamily: "BrandonGrotesqueLight" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget
          feugiat diam. Integer in rhoncus odio. Suspendisse cursus quis tellus
          vel finibus. Vivamus rutrum mollis interdum. Nullam aliquet a ante a
          molestie. In interdum odio imperdiet lectus gravida tincidunt. Aenean
          eu tincidunt mauris, a mattis mauris. Suspendisse tincidunt sed leo in
          ullamcorper. Cras vestibulum arcu est, id sodales lorem pharetra
          vitae.
        </Text>
      </Box>
    )
  }
}
