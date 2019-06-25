import React from "react"
import styled from "styled-components"
import GoogleMapReact from "google-map-react"
import { navigate } from "gatsby"

import SEO from "../components/seo"
import Header from "../components/header"
import { FlexedDiv, Text, Box } from "../components/common"
import Marker from "../components/mapMarker"

import colors from "../lib/colors"

import searchByRouteSquare from "../images/search-by-route-square.png"

const unique = (locations, attr) =>
  Array.from(new Set(locations.map(l => l[attr]).flat()))
    .filter(elem => elem)
    .sort()

export default class Results extends React.Component {
  constructor(props) {
    super(props)

    const { results, description, locations } = this.props.location.state

    this.state = {
      displayMap: false,
      results,
      locations,
      filterOptions: {
        state: unique(locations, "state"),
        city: unique(locations, "city"),
        tag: unique(locations, "tags"),
      },
      filterBy: {
        state: undefined,
        city: undefined,
        tag: undefined,
      },
      description,
    }
  }

  filter(key, value) {
    const { locations } = this.state
    const filterBy = {}
    filterBy[key] = value

    const results = locations
      .filter(l =>
        Object.keys(filterBy).every(key => {
          if (!filterBy[key]) return true
          return key === "tag"
            ? l.tags.indexOf(filterBy[key]) > -1
            : filterBy[key] === l[key]
        })
      )
      .map(location => ({ location }))

    let description = `${results.length} result${
      results.length === 1 ? "" : "s"
    } `

    if (filterBy["tag"]) description += "for " + filterBy["tag"]
    if (filterBy["state"]) description += "in " + filterBy["state"]
    if (filterBy["city"]) description += "in " + filterBy["city"]

    this.setState({ description, results, filterBy })
  }

  render() {
    const {
      results,
      description,
      displayMap,
      filterOptions,
      filterBy,
    } = this.state

    const displayMapBanner = results.length ? (
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
    ) : null

    const map = results.length ? (
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
    ) : null

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

            <Text extraSmall style={{ display: "inline-block" }}>
              {data.location.city}, {data.location.state}
            </Text>
          </div>

          {data.distance !== undefined && (
            <Text style={{ marginLeft: "20px" }} color={colors.orange}>
              {Math.round(data.distance * 10) / 10}m
            </Text>
          )}
        </FlexedDiv>

        {data.location.tags.length && (
          <Text color={colors.orange} extraSmall style={{ textAlign: "left" }}>
            {data.location.tags.sort().join(", ")}
          </Text>
        )}

        {data.location.comments && (
          <Text color={colors.orange} style={{ textAlign: "left" }}>
            {data.location.comments}
          </Text>
        )}
      </Result>
    )

    return (
      <Box>
        <Header
          reset={() => navigate("/")}
          showFilters={true}
          filterBy={filterBy}
          filter={this.filter.bind(this)}
          filterOptions={filterOptions}
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
  height: calc(100% - 53px);
  text-align: center;
  display: flex;
  padding: 0 10px;
  flex-direction: column;
  object-fit: contain;
`

const Result = styled.div`
  max-width: 750px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 40px;
`
