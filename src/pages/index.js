import React from "react"
import * as geolib from "geolib"

import Layout from "../components/layout"
import SEO from "../components/seo"
import HeaderComponent from "../components/header"
import Results from "../components/results"

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
  Text,
} from "./components"

import { parseRow, geocode } from "../lib/helpers"

import colors from "../lib/colors"

const DATA_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRPPv-4s_IwrC3f89lf7uesNNyl_Omig9EvbqiAoTcI61z_tPocemFqVPGSfs0feyfoa4qgynMpKU9W/pub?output=csv"
const MAX_RESULTS = 10

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchType: "route",
      locationA: "Greenwich, CT",
      locationB: "Austin, TX",
    }
  }

  checkLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords
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

  async findNearLocation(locationA) {
    geocode(locationA, (lat, lng) => {
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

      this.setState({ results })
    })
  }

  async findAlongRoute(locationA, locationB) {
    geocode(locationA, (latA, lngA) => {
      geocode(locationB, (latB, lngB) => {
        const results = this.state.locations
          .map(location => ({
            location,
            distance:
              geolib.getDistanceFromLine(
                { latitude: location.latitude, longitude: location.longitude },
                { latitude: latA, longitude: lngA },
                { latitude: latB, longitude: lngB }
              ) / 1609.344,
          }))
          .filter(a => a.distance < 25)
          .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
          .slice(0, MAX_RESULTS)

        this.setState({ results })
      })
    })
  }

  render() {
    const { searchType, locationA, locationB, results } = this.state

    const isSearchingDestination = searchType === "destination"
    const isSearchingRoute = searchType === "route"

    const displayResults = Array.isArray(results)
    let resultsDescription = ""

    if (displayResults) {
      resultsDescription += `${results.length} result`
      if (results.length > 1) resultsDescription += "s"
      if (isSearchingRoute) {
        resultsDescription += ` from ${locationA} to ${locationB}`
      }
      if (isSearchingDestination) resultsDescription += ` nearby ${locationA}`
    }

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
            isSearchingDestination
              ? this.findNearLocation(locationA)
              : this.findAlongRoute(locationA, locationB)
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

        <div style={{ flex: 1, marginTop: "15px" }}>
          <Text>View All</Text>
        </div>
      </SearchBoxes>
    )

    return (
      <div
        id="container"
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SEO title="Home" />

        <HeaderComponent siteTitle="Tour Food" />

        {displayResults ? (
          <Results results={results} description={resultsDescription} />
        ) : (
          searchComponent
        )}
      </div>
    )
  }
}
