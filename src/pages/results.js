import React from "react"
import styled from "styled-components"
import GoogleMapReact from "google-map-react"

import SEO from "../components/seo"
import HeaderComponent from "../components/header"
import { FlexedDiv, Text, Box } from "../components/common"
import Marker from "../components/mapMarker"

import colors from "../lib/colors"

import searchByRouteSquare from "../images/search-by-route-square.png"

export default class Results extends React.Component {
  constructor(props) {
    super(props)

    const { results, description } = this.props.location.state

    this.state = {
      displayMap: false,
      results,
      description,
    }
  }

  render() {
    const { results, description, displayMap } = this.state

    const displayMapBanner = (
      <FlexedDiv
        style={{
          borderBottom: `3px solid ${colors.blue}`,
          padding: "8px 0",
          width: "100vw",
          marginLeft: "-10px",
          cursor: "pointer",
        }}
        onClick={() => this.setState({ displayMap: true })}
      >
        <img
          style={{ height: "40px", width: "40px", marginRight: "5px" }}
          src={searchByRouteSquare}
          alt="search by route"
        />
        <Text>View on Map</Text>
      </FlexedDiv>
    )

    const map = (
      <div style={{ height: "50%", width: "100vw", marginLeft: "-10px" }}>
        <GoogleMapReact
          disableDefaultUI={true}
          bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_API_KEY }}
          defaultCenter={{
            lat: results[0].location.latitude,
            lng: results[0].location.longitude,
          }}
          defaultZoom={1}
          disableDefaultUI={true}
        >
          {results.map(r => (
            <Marker
              key={r.location.name}
              lat={r.location.latitude}
              lng={r.location.longitude}
              name={r.location.name}
            />
          ))}
        </GoogleMapReact>
      </div>
    )

    const result = (data, idx) => (
      <Result key={idx}>
        <FlexedDiv
          style={{
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <Text
              color={colors.blue}
              large
              style={{ display: "inline-block", marginRight: "10px" }}
            >
              {data.location.name}
            </Text>

            <Text small style={{ display: "inline-block" }}>
              {data.location.city}, {data.location.state}
            </Text>
          </div>

          <Text style={{ marginLeft: "20px" }} color={colors.orange}>
            {Math.round(data.distance * 10) / 10}m
          </Text>
        </FlexedDiv>
      </Result>
    )

    return (
      <Box>
        <HeaderComponent
          reset={() => console.log("hi")}
          siteTitle="Tour Food"
        />

        <SEO title="Home" />

        <ResultsBox>
          {displayMap ? map : displayMapBanner}

          <Text
            style={{
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            {description}
          </Text>

          <ScrollContainer>{(results || []).map(result)}</ScrollContainer>
        </ResultsBox>
      </Box>
    )
  }
}

const ScrollContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`

const ResultsBox = styled.div`
  height: 100%;
  text-align: center;
  display: flex;
  padding: 0 10px;
  flex-direction: column;
  object-fit: contain;
`

const Result = styled.div`
  max-width: 750px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
`
