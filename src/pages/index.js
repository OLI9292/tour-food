import React from "react"
import * as geolib from "geolib"
import { navigate } from "gatsby"

import SEO from "../components/seo"
import HeaderComponent from "../components/header"

import searchByRoute from "../images/search-by-route.png"
import searchNearby from "../images/search-nearby.png"

import {
  Header,
  SearchBoxes,
  SearchBox,
  Image,
  Input,
  GrayLine,
  Submit,
  Form,
} from "./components"

import { Box, Text } from "../components/common"

import { parseRow, geocode } from "../lib/helpers"

import colors from "../lib/colors"

const DATA_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRPPv-4s_IwrC3f89lf7uesNNyl_Omig9EvbqiAoTcI61z_tPocemFqVPGSfs0feyfoa4qgynMpKU9W/pub?output=csv"
const MAX_RESULTS = 30

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    })
  }

  checkLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords
          console.log(latitude, longitude)
        },
        error => console.log(error),
        { timeout: 5000 }
      )
    }
  }

  componentDidMount() {
    this.checkLocation()

    fetch(DATA_URL)
      .then(res => res.text())
      .then(rows => {
        const locations = rows
          .split("\n")
          .map(parseRow)
          .slice(1)
        this.setState({ locations })
      })
  }

  async findNearLocation(locations, cb) {
    geocode(locations[0], (lat, lng) => {
      const results = this.state.locations
        .map(location => ({
          location,
          distance:
            geolib.getDistance(
              { latitude: location.latitude, longitude: location.longitude },
              { latitude: lat, longitude: lng }
            ) / 1609.344,
        }))
        .filter(a => a.distance < 25)
        .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
        .slice(0, MAX_RESULTS)
      cb(results)
    })
  }

  async findAlongRoute(locations, cb) {
    geocode(locations[0], (latA, lngA) =>
      geocode(locations[1], (latB, lngB) => {
        const results = this.state.locations
          .map(location => ({
            location,
            distance:
              geolib.getDistanceFromLine(
                {
                  latitude: location.latitude,
                  longitude: location.longitude,
                },
                { latitude: latA, longitude: lngA },
                { latitude: latB, longitude: lngB }
              ) / 1609.344,
          }))
          .filter(a => a.distance < 25)
          .map(({ location, distance }) => ({
            location,
            distance,
            minimumDistanceFromLocation: Math.min(
              geolib.getDistance(
                {
                  latitude: location.latitude,
                  longitude: location.longitude,
                },
                { latitude: latA, longitude: lngA }
              ) / 1609.344,
              geolib.getDistance(
                {
                  latitude: location.latitude,
                  longitude: location.longitude,
                },
                { latitude: latB, longitude: lngB }
              ) / 1609.344
            ),
          }))
          .filter(a => a.minimumDistanceFromLocation > 10)
          .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
          .slice(0, MAX_RESULTS)
        cb(results)
      })
    )
  }

  render() {
    const { searchType, locationA, locationB, results, locations } = this.state

    const isSearchingDestination = searchType === "destination"
    const isSearchingRoute = searchType === "route"

    const searchNearbyHeader = (
      <Header color={colors.blue}>search nearby</Header>
    )

    const searchByRouteHeader = (
      <Header color={colors.orange}>search by route</Header>
    )

    const searchComponent = (
      <Form>
        <div style={{ margin: "40px 0" }}>
          {isSearchingDestination ? searchNearbyHeader : searchByRouteHeader}
        </div>

        <div style={{ margin: "20px 0" }}>
          <Input
            onChange={e => this.setState({ locationA: e.target.value })}
            value={locationA || ""}
            type="value"
            autoFocus={true}
            placeholder={isSearchingDestination ? "Location..." : "From..."}
          />
          <GrayLine />
        </div>

        {searchType === "route" && (
          <div style={{ margin: "20px 0" }}>
            <Input
              onChange={e => this.setState({ locationB: e.target.value })}
              value={locationB || ""}
              type="value"
              placeholder="To..."
            />
            <GrayLine />
          </div>
        )}

        <Submit
          onClick={e => {
            e.preventDefault()
            const fn = isSearchingDestination
              ? this.findNearLocation.bind(this)
              : this.findAlongRoute.bind(this)

            fn([locationA, locationB], results => {
              const displayResults = results.length > 0
              let description = ""

              if (displayResults) {
                description += `${results.length} result`
                if (results.length > 1) description += "s"
                if (isSearchingRoute) {
                  description += ` from ${locationA} to ${locationB}`
                }
                if (isSearchingDestination)
                  description += ` nearby ${locationA}`
              }

              navigate("/results", {
                state: { description, results, locations },
              })
            })
          }}
          type="submit"
          value="search"
          color={isSearchingDestination ? colors.blue : colors.orange}
        />
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
          onClick={() =>
            navigate("/results", { state: { results: [], locations } })
          }
          style={{ cursor: "pointer", flex: 1, marginTop: "15px" }}
        >
          <Text>View All</Text>
        </div>
      </SearchBoxes>
    )

    return (
      <Box id="container">
        <SEO title="Home" />

        <HeaderComponent reset={this.reset.bind(this)} siteTitle="Tour Food" />

        {searchType ? searchComponent : selectSearchComponent}
      </Box>
    )
  }
}
