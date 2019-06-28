import React from "react"
import { navigate } from "gatsby"

import SEO from "../components/seo"
import HeaderComponent from "../components/header"

import searchByRoute from "../images/search-by-route.png"
import searchNearby from "../images/search-nearby.png"

import {
  Box,
  Text,
  Header,
  SearchBoxes,
  SearchBox,
  Image,
  Input,
  GrayLine,
  Submit,
  Form,
} from "../components/common"

import {
  parseRow,
  geocode,
  distanceFromLine,
  distanceInMiles,
} from "../lib/helpers"

import colors from "../lib/colors"

const DATA_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSba72Al-RA3rUkBruesaJpLe8A5pIm-EJ8ZvY5SeSIzJWi8sebSnNqBTckypxCCyEhk2UaWvD_6Kfe/pub?output=csv"

const MAX_RESULTS = 30

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      // searchType: "destination",
      // locationA: "Brooklyn, NY",
      // locationB: "Austin, TX",
    }
  }

  reset() {
    this.setState({
      searchType: undefined,
      locationA: undefined,
      locationB: undefined,
      results: undefined,
      error: undefined,
    })
  }

  // checkLocation() {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       ({ coords }) => {
  //         const { latitude, longitude } = coords
  //         console.log(latitude, longitude)
  //       },
  //       error => console.log(error),
  //       { timeout: 5000 }
  //     )
  //   }
  // }

  componentDidMount() {
    // this.checkLocation()

    fetch(DATA_URL)
      .then(res => res.text())
      .then(rows => {
        const locations = rows
          .split("\n")
          .map(parseRow)
          .filter(r => r)
          .slice(1)
        console.log("Data loaded.")
        this.setState({ locations })
      })
  }

  async findNearLocation(locations, cb) {
    geocode(locations[0], (lat, lng, address, error) => {
      if (error) return this.setState({ error })

      const results = this.state.locations
        .map(location => ({
          location,
          distance: distanceInMiles(
            location.latitude,
            location.longitude,
            lat,
            lng
          ),
        }))
        .filter(a => a.distance < 25)
        .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
        .slice(0, MAX_RESULTS)
      cb(results, address)
    })
  }

  async findAlongRoute(locations, cb) {
    geocode(locations[0], (latA, lngA, addressA, errorA) =>
      geocode(locations[1], (latB, lngB, addressB, errorB) => {
        const error = errorA || errorB
        if (error) return this.setState({ error })

        const results = this.state.locations
          .map(location => {
            const { latitude, longitude } = location
            return {
              location,
              distance: distanceFromLine(
                latitude,
                longitude,
                latA,
                lngA,
                latB,
                lngB
              ),
            }
          })
          .filter(a => a.distance < 25)
          .map(({ location, distance }) => {
            const { latitude, longitude } = location
            return {
              location,
              distance,
              minimumDistanceFromLocation: Math.min(
                distanceInMiles(latitude, longitude, latA, lngA),
                distanceInMiles(latitude, longitude, latB, lngB)
              ),
            }
          })
          .filter(a => a.minimumDistanceFromLocation > 10)
          .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
          .slice(0, MAX_RESULTS)

        cb(results, addressA, addressB)
      })
    )
  }

  glowInput(glow) {
    if (this.state.glow) return
    const error = `Please enter a ${
      glow.includes("A") ? "location" : "destination"
    }.`
    this.setState({ glow, error })
    setTimeout(() => this.setState({ glow: undefined }), 1000)
  }

  search(locationA, locationB, locations, isSearchingRoute) {
    if (!locationA) return this.glowInput("locationA")
    if (isSearchingRoute && !locationB) return this.glowInput("locationB")
    this.setState({ error: undefined })

    const fn = isSearchingRoute
      ? this.findAlongRoute.bind(this)
      : this.findNearLocation.bind(this)

    fn([locationA, locationB], (results, addressA, addressB) => {
      const location = isSearchingRoute
        ? ` from ${addressA} to ${addressB}`
        : ` near ${addressA}`

      if (results.length === 0) {
        return this.setState({ error: "0 results" + location })
      }

      let description = `${results.length} result`
      if (results.length > 1) description += "s"
      description += location

      const state = { description, results, locations }
      navigate("/results", { state })
    })
  }

  render() {
    const {
      searchType,
      locationA,
      locationB,
      locations,
      glow,
      error,
    } = this.state

    const isSearchingDestination = searchType === "destination"
    const isSearchingRoute = searchType === "route"

    const searchNearbyHeader = (
      <Header color={colors.orange}>search nearby</Header>
    )

    const searchByRouteHeader = (
      <Header color={colors.blue}>search by route</Header>
    )

    const searchComponent = (
      <Form>
        <div style={{ margin: "40px 0" }}>
          {isSearchingDestination ? searchNearbyHeader : searchByRouteHeader}
        </div>

        <div style={{ margin: "20px 0" }}>
          <Input
            spellCheck={false}
            onChange={e => this.setState({ locationA: e.target.value })}
            value={locationA || ""}
            type="value"
            autoFocus={true}
            placeholder={isSearchingDestination ? "Location..." : "From..."}
          />
          <GrayLine glow={glow === "locationA"} />
        </div>

        {searchType === "route" && (
          <div style={{ margin: "20px 0" }}>
            <Input
              spellCheck={false}
              onChange={e => this.setState({ locationB: e.target.value })}
              value={locationB || ""}
              type="value"
              placeholder="To..."
            />
            <GrayLine glow={glow === "locationB"} />
          </div>
        )}

        <Submit
          onClick={e => {
            e.preventDefault()
            this.search(locationA, locationB, locations, isSearchingRoute)
          }}
          type="submit"
          value="search"
          color={isSearchingDestination ? colors.orange : colors.blue}
        />

        {error && (
          <Text small color={colors.red} style={{ marginTop: "15px" }}>
            {error}
          </Text>
        )}
      </Form>
    )

    const selectSearchComponent = (
      <SearchBoxes>
        <SearchBox
          style={{ marginBottom: "15px" }}
          onClick={() => this.setState({ searchType: "route" })}
        >
          <Image style={{ backgroundImage: `url("${searchByRoute}")` }} />
          {searchByRouteHeader}
        </SearchBox>

        <SearchBox onClick={() => this.setState({ searchType: "destination" })}>
          <Image style={{ backgroundImage: `url("${searchNearby}")` }} />
          {searchNearbyHeader}
        </SearchBox>

        <div
          onClick={() => {
            if (!locations.length) return
            navigate("/results", { state: { results: [], locations } })
          }}
          style={{ cursor: "pointer", flex: 1, marginTop: "15px" }}
        >
          <Text style={{ letterSpacing: "1px" }}>VIEW ALL</Text>
        </div>
      </SearchBoxes>
    )

    return (
      <Box>
        <SEO title="Home" />

        <HeaderComponent reset={this.reset.bind(this)} siteTitle="Tour Food" />

        {searchType ? searchComponent : selectSearchComponent}
      </Box>
    )
  }
}
