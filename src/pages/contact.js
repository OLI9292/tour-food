import React from "react"
import styled from "styled-components"
import Iframe from "react-iframe"

import SEO from "../components/seo"
import HeaderComponent from "../components/header"

import { Box } from "../components/common"

const URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSesDDWRjeO9WO9nPOgWmbHxEQ5VHDt1AJpVM6f3w9S4BmV07Q/viewform?embedded=true"

export default class ContactPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Box>
        <SEO title="Contact" />

        <HeaderComponent searchProps={{}} siteTitle="Tour Food" />

        <IframeBox>
          <Iframe url={URL} width="100%" height="100%" />
        </IframeBox>
      </Box>
    )
  }
}

const IframeBox = styled.div`
  position: absolute;
  top: 60px;
  bottom: 0;
  padding: 20px 0;
  overflow-y: hidden;
  box-sizing: border-box;
  width: 100%;
`
