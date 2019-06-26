import React from "react"
import styled from "styled-components"
import GoogleMapReact from "google-map-react"
import { fitBounds } from "google-map-react/utils"

import SEO from "../components/seo"
import Header from "../components/header"
import { FlexedDiv, Text, Box } from "../components/common"
import Marker from "../components/mapMarker"

import colors from "../lib/colors"
import { getBounds, unique } from "../lib/helpers"

import searchByRouteSquare from "../images/search-by-route-square.png"

export default class Results extends React.Component {
  constructor(props) {
    super(props)

    let results = []
    let locations = []
    let description

    const { location } = this.props

    if (location.state) {
      results = location.state.results
      description = location.state.description
      locations = location.state.locations
      if (!results.length) results = locations.map(location => ({ location }))
    }

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

    this.setState({ description, results, filterBy, selected: undefined })
  }

  render() {
    const {
      results,
      description,
      displayMap,
      filterOptions,
      filterBy,
      selected,
    } = this.state

    const bounds = getBounds(results)

    const size = {
      width: 640, // Map width in pixels
      height: 380, // Map height in pixels
    }

    let { center, zoom } = fitBounds(bounds, size)
    if (selected) {
      center = {
        lat: selected.location.latitude,
        lng: selected.location.longitude,
      }
    }

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
          style={{ height: "35px", width: "35px", marginRight: "5px" }}
          src={searchByRouteSquare}
          alt="search by route"
        />
        <Text small>View on Map</Text>
      </FlexedDiv>
    ) : null

    const map = results.length ? (
      <div style={{ height: "50%", width: "100vw", marginLeft: "-10px" }}>
        <GoogleMapReact
          disableDefaultUI={true}
          bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_API_KEY }}
          center={center}
          zoom={zoom}
        >
          {results.map(r => (
            <Marker
              key={r.location.name}
              lat={r.location.latitude}
              lng={r.location.longitude}
              name={r.location.name}
              isSelected={
                selected && selected.location.name === r.location.name
              }
              selected={() => {
                this.setState({ selected: r })
                const scrollBox = document.getElementById("scroll-box")
                const element = document.getElementById(r.location.name)
                if (!element || !scrollBox) return
                scrollBox.scroll({ top: element.offsetTop, behavior: "smooth" })
              }}
            />
          ))}
        </GoogleMapReact>
      </div>
    ) : null

    const result = (data, idx) => (
      <ResultBox
        highlight={selected && selected.location.name === data.location.name}
        id={data.location.name}
        key={idx}
      >
        <InnerResultBox>
          <FlexedDiv
            style={{
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <a target="_blank" href={data.location.url}>
                <Text
                  color={colors.blue}
                  large
                  style={{ display: "inline-block", marginRight: "10px" }}
                >
                  {data.location.name}
                </Text>
              </a>

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
            <Text
              color={colors.orange}
              extraSmall
              style={{ textAlign: "left" }}
            >
              {data.location.tags.sort().join(", ")}
            </Text>
          )}

          {data.location.comments && (
            <Text
              small
              color={colors.darkGray}
              style={{ textAlign: "left", fontWeight: 600, marginTop: "5px" }}
            >
              {data.location.comments}
            </Text>
          )}
        </InnerResultBox>
      </ResultBox>
    )

    return (
      <Box>
        <Header
          showFilters={true}
          filterBy={filterBy}
          filter={this.filter.bind(this)}
          filterOptions={filterOptions}
          siteTitle="Tour Food"
        />

        <SEO title="Home" />

        <ResultsBox>
          {displayMap ? map : displayMapBanner}

          {description && (
            <Text
              small
              style={{
                textAlign: "center",
                padding: "8px 0",
                width: "100vw",
                marginLeft: "-10px",
                color: "white",
                backgroundColor: colors.blue,
              }}
            >
              {description}
            </Text>
          )}

          <ScrollBox id="scroll-box">{(results || []).map(result)}</ScrollBox>
        </ResultsBox>
      </Box>
    )
  }
}

const ScrollBox = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow: scroll;
  -ms-overflow-style: none;
  width: 100vw;
  margin-left: -10px;
  padding: 0 10px;
  box-sizing: border-box;
  position: relative;
`

const ResultsBox = styled.div`
  height: calc(100% - 53px);
  text-align: center;
  display: flex;
  padding: 0 10px;
  flex-direction: column;
  object-fit: contain;
`

const ResultBox = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: ${p => p.highlight && colors.lightestGray};
  width: 100vw;
  margin-left: -10px;
  padding: 15px 0;
`

const InnerResultBox = styled.div`
  margin: 0 auto;
  max-width: 750px;
`
