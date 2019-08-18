import React from "react"
import styled from "styled-components"
import GoogleMapReact from "google-map-react"
import { fitBounds } from "google-map-react/utils"
import { navigate } from "gatsby"

import SEO from "../components/seo"
import Header from "../components/header"
import { FlexedDiv, Text, Box } from "../components/common"
import Marker from "../components/mapMarker"

import colors from "../lib/colors"
import { getBounds, getFilterOptions } from "../lib/helpers"

import searchByRouteSquare from "../images/search-by-route-square.png"
import close from "../images/close.png"

const MAX_FILTER_OPTIONS = 40

const parseProps = props => {
  if (!props.location.state) return
  let { locations, results, filterBy } = props.location.state
  if (results.length) locations = results.map(r => r.location)
  const filterOptions = getFilterOptions(
    locations,
    filterBy,
    MAX_FILTER_OPTIONS
  )
  return Object.assign(props.location.state, filterOptions)
}

export default class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayMap: false,
      results: [],
      locations: [],
      filterOptions: { state: [], city: [], topCities: [], tag: [] },
    }
  }

  componentDidMount() {
    console.log("Component mounting.")
    const state = parseProps(this.props)

    this.setState(state, () => {
      const { filterBy, results, locations } = this.state

      if (!locations.length || !filterBy) return navigate("/")

      const key = Object.keys(filterBy).find(key => filterBy[key])

      if (key) {
        this.filter(key, filterBy[key])
      } else if (!results.length) {
        this.filter()
      }
    })
  }

  filter(key, value) {
    console.log(`Filter ${key} to ${value}.`)
    let { locations, filterBy } = this.state
    if (key) filterBy[key] = value
    if (key === "state" && value === undefined) filterBy["city"] = undefined

    if (key === "city" && !filterBy["state"]) {
      const location = locations.find(l => l.city === value)
      if (location) filterBy["state"] = location.state
    }

    locations = locations.filter(l =>
      Object.keys(filterBy).every(key => {
        if (!filterBy[key]) return true
        return key === "tag"
          ? l.tags.indexOf(filterBy[key]) > -1
          : filterBy[key] === l[key]
      })
    )

    const results = locations.map(location => ({ location }))

    let description = `${results.length} result${
      results.length === 1 ? "" : "s"
    } `

    const stateOrCity = filterBy["state"] || filterBy["city"]

    if (filterBy["tag"]) {
      description += "for " + filterBy["tag"]
      description += stateOrCity ? " " : ""
    }

    if (filterBy["state"] && filterBy["city"]) {
      description += `in ${filterBy["city"]}, ${filterBy["state"]}`
    } else if (filterBy["city"]) {
      description += `in ${filterBy["city"]}`
    } else if (filterBy["state"]) {
      description += `in ${filterBy["state"]}`
    }

    let { filterOptions } = getFilterOptions(
      locations,
      filterBy,
      MAX_FILTER_OPTIONS
    )

    this.setState({
      description,
      results,
      filterBy,
      filterOptions,
      selected: undefined,
    })

    const scrollBox = document.getElementById("scroll-box")
    if (scrollBox) scrollBox.scroll({ top: 0 })
  }

  selected(result) {
    this.setState({ selected: result, displayMap: true })
    const scrollBox = document.getElementById("scroll-box")
    const element = document.getElementById(result.location.name)
    if (!element || !scrollBox) return
    scrollBox.scroll({ top: element.offsetTop, behavior: "smooth" })
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

    const mapContainer =
      typeof window !== "undefined" && document.getElementById("map-box")
    const width = mapContainer ? mapContainer.clientWidth : 640
    const height = mapContainer ? mapContainer.clientHeight : 380
    const size = { width, height }

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
          minHeight: "35px",
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
      <MapBox id="map-box">
        <CloseImage
          onClick={() => this.setState({ displayMap: false })}
          src={close}
        />
        <GoogleMapReact
          disableDefaultUI={true}
          bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_API_KEY }}
          center={center}
          zoom={zoom}
        >
          {results.map((r, idx) => (
            <Marker
              key={idx}
              lat={r.location.latitude}
              lng={r.location.longitude}
              name={r.location.name}
              isSelected={
                selected && selected.location.name === r.location.name
              }
              selected={() => this.selected(r)}
            />
          ))}
        </GoogleMapReact>
      </MapBox>
    ) : null

    const result = (data, idx) => {
      const isSelected =
        selected && selected.location.name === data.location.name
      return (
        <ResultBox
          highlight={isSelected}
          id={data.location.name}
          key={idx}
          onClick={() => this.selected(data)}
        >
          <InnerResultBox>
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
                  style={{
                    display: "inline-block",
                    marginRight: "10px",
                    fontFamily: "BrandonGrotesqueBold",
                    letterSpacing: "0.5px",
                  }}
                >
                  {data.location.name}
                </Text>

                <Text extraSmall style={{ display: "inline-block" }}>
                  {data.location.city}, {data.location.state}
                </Text>
              </div>

              {data.distance !== undefined && (
                <Text style={{ marginLeft: "20px" }} color={colors.orange}>
                  {Math.round(data.distance * 10) / 10}mi
                </Text>
              )}
            </FlexedDiv>

            {data.location.tags.length > 0 && (
              <Text
                color={colors.orange}
                extraSmall
                style={{ textAlign: "left", textTransform: "capitalize" }}
              >
                {data.location.tags.sort().join(", ")}
              </Text>
            )}

            {data.location.comments && (
              <Text
                small
                style={{
                  textAlign: "left",
                  fontWeight: 400,
                  marginTop: "5px",
                  width: "calc(100% - 150px)",
                  fontFamily: "BrandonGrotesqueLight",
                }}
              >
                {data.location.comments}
              </Text>
            )}
            {isSelected && (
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={data.location.url}
              >
                <GoogleMapsLink extraSmall>Open in Google Maps</GoogleMapsLink>
              </a>
            )}
          </InnerResultBox>
        </ResultBox>
      )
    }

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
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  width: 100vw;
  margin-left: -10px;
  padding: 0 10px;
  box-sizing: border-box;
  position: relative;
`

const ResultsBox = styled.div`
  height: calc(100% - 62px);
  text-align: center;
  display: flex;
  padding: 0 10px;
  flex-direction: column;
  object-fit: contain;
  position: fixed;
  top: 62px;
`

const ResultBox = styled.div`
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: ${p => p.highlight && colors.lightestGray};
  width: 100vw;
  margin-left: -10px;
  padding: 15px 0;
`

const InnerResultBox = styled.div`
  margin: 0 auto;
  min-height: 75px;
  max-width: 750px;
  padding: 0 15px;
  position: relative;
`

const MapBox = styled.div`
  height: 50%;
  width: 100vw;
  margin-left: -10px;
  position: relative;
`

const CloseImage = styled.img`
  width: 45px;
  height: 45px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
  border-bottom: 3px solid ${colors.blue};
  border-left: 3px solid ${colors.blue};
  z-index: 500;
`

const GoogleMapsLink = styled(Text)`
  position: absolute;
  bottom: 0
  right: 0;
  text-transform: capitalize;
  border: 1px solid ${colors.orange}; 
  color: ${colors.orange};
  padding: 5px;
  margin-right: 10px;
  box-sizing: border-box;
  font-weight: 600;
`
