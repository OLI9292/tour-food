import React from "react"
import styled from "styled-components"
import GoogleMapReact from "google-map-react"
import { fitBounds } from "google-map-react/utils"
import { navigate } from "gatsby"
import { isEqual, get } from "lodash"

import SEO from "../components/seo"
import HeaderComponent from "../components/header"
import { FlexedDiv, Text, Box } from "../components/common"
import Marker from "../components/mapMarker"

import colors from "../lib/colors"
import { getBounds, getFilterOptions, idForLocation } from "../lib/helpers"

import upArrow from "../images/icon-up-arrow.png"
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
    this.reset(this.props)
  }

  reset(props) {
    if (!props) return

    const state = parseProps(props)

    this.setState(state, () => {
      const { filterBy, results, locations } = this.state

      if (!locations.length || !filterBy) return navigate("/")

      const key = Object.keys(filterBy).find(key => filterBy[key])

      if (key) {
        this.filter(key, filterBy[key])
      } else if (!results.length) {
        this.filter()
      }

      this.resetMap()
    })
  }

  resetMap() {
    const { map, maps, route, routePolyline } = this.state
    if (!map || !maps || !route) return
    routePolyline.setMap(null)
    this.drawRoute(map, maps, route.origin, route.destination)
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

    this.scrollToTop()
  }

  scrollToTop() {
    const scrollBox = document.getElementById("scroll-box")
    if (scrollBox) scrollBox.scroll({ top: 0 })
  }

  selected(result) {
    this.setState({ selected: result, displayMap: true })
    const scrollBox = document.getElementById("scroll-box")
    const element = document.getElementById(idForLocation(result))
    if (!element || !scrollBox) return
    scrollBox.scroll({ top: element.offsetTop, behavior: "smooth" })
  }

  // https://github.com/google-map-react/google-map-react/issues/457
  drawRoute(map, maps, origin, destination) {
    const directionsService = new maps.DirectionsService()
    const directionsDisplay = new maps.DirectionsRenderer()

    directionsService.route(
      { origin, destination, travelMode: "DRIVING" },
      (res, status) => {
        if (status !== "OK") {
          console.log("Directions request failed due to " + status)
          return
        }
        directionsDisplay.setDirections(res)
        const path = res.routes[0].overview_path
        const routePolyline = new maps.Polyline({
          path,
          icons: [
            { icon: { path: maps.SymbolPath.CIRCLE }, offset: "100%" },
            { icon: { path: maps.SymbolPath.CIRCLE }, offset: "0%" },
          ],
          strokeColor: colors.blue,
          strokeWeight: 2.5,
        })
        routePolyline.setMap(map)
        this.setState({ routePolyline })
      }
    )
  }

  render() {
    const {
      description,
      displayMap,
      filterBy,
      filterOptions,
      results,
      route,
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
          yesIWantToUseGoogleMapApiInternals={true}
          zoom={zoom}
          onGoogleApiLoaded={({ map, maps }) => {
            this.setState({ map, maps })
            if (!route) return
            this.drawRoute(map, maps, route.origin, route.destination)
          }}
        >
          {results.map((r, idx) => (
            <Marker
              key={idx}
              lat={r.location.latitude}
              lng={r.location.longitude}
              name={r.location.name}
              isSelected={
                selected && idForLocation(selected) === idForLocation(r)
              }
              selected={() => this.selected(r)}
            />
          ))}
        </GoogleMapReact>
      </MapBox>
    ) : null

    const result = (data, idx) => {
      const isSelected = isEqual(selected, data)
      return (
        <ResultBox
          highlight={isSelected}
          id={idForLocation(data)}
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
                <GoogleMapsLink
                  style={{ fontFamily: "BrandonGrotesqueLight" }}
                  extraSmall
                >
                  Open in Google Maps
                </GoogleMapsLink>
              </a>
            )}
          </InnerResultBox>
        </ResultBox>
      )
    }

    const searchProps = window.searchProps

    return (
      <Box>
        <HeaderComponent
          reset={this.reset.bind(this)}
          searchType={get(searchProps, "searchType")}
          autocompleteOptions={get(searchProps, "autocompleteOptions")}
          myLocation={get(searchProps, "myLocation")}
          locations={get(searchProps, "locations")}
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
                padding: "8px",
                width: "100vw",
                marginLeft: "-10px",
                boxSizing: "border-box",
                color: "white",
                backgroundColor: colors.blue,
              }}
            >
              {description}
            </Text>
          )}

          <GoUp onClick={this.scrollToTop.bind(this)} src={upArrow} />

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

const GoUp = styled.img`
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 400;
  width: 50px;
  height: auto;
  padding: 10px;
  cursor: pointer;
  @media (max-width: 600px) {
    padding: 5px;
  }
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
  @media (max-width: 600px) {
    height: calc(100% - 47px);
    top: 47px;
  }
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
  height: 44vh;
  width: 100vw;
  margin-left: -10px;
  position: relative;
  display: inline-table;
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
