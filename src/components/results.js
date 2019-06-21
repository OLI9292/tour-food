import React from "react"
import styled from "styled-components"
import { Map, Marker, GoogleApiWrapper } from "google-maps-react"

import { FlexedDiv, Text } from "./common"

import colors from "../lib/colors"

import searchByRouteSquare from "../images/search-by-route-square.png"

class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayMap: true,
    }
  }

  render() {
    const { results, description } = this.props
    const { displayMap } = this.state

    const displayMapBanner = (
      <FlexedDiv
        style={{
          borderBottom: `3px solid ${colors.blue}`,
          padding: "5px",
          cursor: "pointer",
        }}
      >
        <img
          style={{ height: "40px", width: "40px", marginRight: "5px" }}
          src={searchByRouteSquare}
        />
        <Text>View on Map</Text>
      </FlexedDiv>
    )

    const marker = result => (
      <Marker
        key={result.location.name}
        title={result.location.name}
        name={result.location.name}
        position={{
          lat: result.location.latitude,
          lng: result.location.longitude,
        }}
      />
    )

    const map = (
      <Map
        google={this.props.google}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        style={{ height: "50%", width: "auto", marginTop: "-20px" }}
        styles={mapStyle}
        initialCenter={{
          lat: results[0].location.latitude,
          lng: results[0].location.longitude,
        }}
        disableDefaultUI={true}
      >
        {results.map(marker)}
      </Map>
    )

    return (
      <Box>
        {displayMap ? map : displayMapBanner}

        <Text
          style={{
            textAlign: "center",
            marginTop: displayMap ? "calc(50% + 50px)" : 0,
          }}
        >
          {description}
        </Text>

        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          {(results || []).map((result, idx) => (
            <div style={{ margin: "20px 0" }} key={idx}>
              <FlexedDiv style={{ justifyContent: "space-between" }}>
                <div>
                  <Text
                    color={colors.blue}
                    large
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    {result.location.name}
                  </Text>

                  <Text small style={{ display: "inline-block" }}>
                    {result.location.city}, {result.location.state}
                  </Text>
                </div>

                <Text color={colors.orange}>
                  {Math.round(result.distance * 10) / 10}m
                </Text>
              </FlexedDiv>
            </div>
          ))}
        </div>
      </Box>
    )
  }
}

const Box = styled.div`
  height: 100%;
  text-align: center;
  padding: 20px 0 0 0;
  display: flex;
  flex-direction: column;
  object-fit: contain;
`

const mapOptions = {
  fullscreenControl: false,
}

const mapStyle = []

export default GoogleApiWrapper({
  apiKey: "AIzaSyDDkb6KxLUg9FvVP3ERRCQPV71kvE6nE0g",
})(Results)
