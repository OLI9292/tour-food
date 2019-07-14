import React from "react"
import { navigate } from "gatsby"
import { uniq, uniqBy } from "lodash"

import SEO from "../components/seo"
import HeaderComponent from "../components/header"

import searchByRoute from "../images/search-by-route.jpg"
import searchNearby from "../images/search-nearby.jpg"

import {
  Box,
  Text,
  Header,
  SearchBoxes,
  SearchBox,
  Image,
  Input,
  Autocomplete,
  GrayLine,
  Submit,
  Form,
} from "../components/common"

import {
  parseRow,
  geocode,
  distanceFromLine,
  directions,
  distanceInMiles,
} from "../lib/helpers"

import colors from "../lib/colors"

const DATA_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSba72Al-RA3rUkBruesaJpLe8A5pIm-EJ8ZvY5SeSIzJWi8sebSnNqBTckypxCCyEhk2UaWvD_6Kfe/pub?output=csv"

const MAX_RESULTS = 75

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      autocompleteOptions: [],
      autocompleteResults: [],
      // searchType: "route",
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

  componentDidMount() {
    fetch(DATA_URL)
      .then(res => res.text())
      .then(rows => {
        const locations = uniqBy(
          rows
            .split("\n")
            .map(parseRow)
            .filter(r => r)
            .slice(1),
          l => `${l.latitude} - ${l.longitude}`
        )

        console.log("Data loaded.")
        const autocompleteOptions = uniq(
          locations.map(l => `${l.city}, ${l.state}`)
        )
        this.setState({ locations, autocompleteOptions })
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
    directions(
      locations[0],
      locations[1],
      (steps, addressA, addressB, startLocation, error) => {
        if (!steps) return

        const results = this.state.locations
          .map(location => {
            const { latitude, longitude } = location

            const distanceFromRoute = Math.min(
              ...steps.map(({ start, end }) =>
                distanceFromLine(
                  latitude,
                  longitude,
                  start.lat,
                  start.lng,
                  end.lat,
                  end.lng
                )
              )
            )

            return { location, distanceFromRoute }
          })
          .filter(a => a.distanceFromRoute < 100)
          .sort(
            (a, b) =>
              parseFloat(a.distanceFromRoute) - parseFloat(b.distanceFromRoute)
          )
          .slice(0, MAX_RESULTS)
          .map(({ location, distanceFromRoute }) => {
            const distance = distanceInMiles(
              location.latitude,
              location.longitude,
              startLocation.lat,
              startLocation.lng
            )

            return { location, distance }
          })
          .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))

        cb(results, addressA, addressB)
      }
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
    this.setState({ isNetworking: true, error: undefined })

    const fn = isSearchingRoute
      ? this.findAlongRoute.bind(this)
      : this.findNearLocation.bind(this)

    fn([locationA, locationB], (results, addressA, addressB) => {
      this.setState({ isNetworking: false })

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

  autocomplete(inputString, inputLetter) {
    inputString = inputString.toLowerCase()
    const autocompleteResults = this.state.autocompleteOptions
      .filter(
        str =>
          str.toLowerCase().startsWith(inputString) &&
          str.toLowerCase() !== inputString
      )
      .slice(0, 4)
    this.setState({ autocompleteResults, inputLetter })
  }

  render() {
    const {
      searchType,
      locationA,
      locationB,
      locations,
      glow,
      inputLetter,
      autocompleteResults,
      isNetworking,
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

        <div style={{ margin: "20px 0", position: "relative" }}>
          <Input
            spellCheck={false}
            onChange={e => {
              const locationA = e.target.value
              this.setState({ locationA }, () =>
                this.autocomplete(locationA, "A")
              )
            }}
            value={locationA || ""}
            type="value"
            autoFocus={true}
            placeholder={
              isSearchingDestination
                ? "Location (venue, city, etc.)"
                : "From (venue, city, etc.)"
            }
          />

          {inputLetter === "A" && autocompleteResults.length > 0 && (
            <Autocomplete>
              {autocompleteResults.map(str => (
                <Text
                  key={str}
                  onClick={() =>
                    this.setState({ locationA: str, autocompleteResults: [] })
                  }
                  style={{ margin: "8px 0", cursor: "pointer" }}
                  small
                >
                  {str}
                </Text>
              ))}
            </Autocomplete>
          )}

          <GrayLine glow={glow === "locationA"} />
        </div>

        {searchType === "route" && (
          <div style={{ margin: "20px 0", position: "relative" }}>
            <Input
              spellCheck={false}
              onChange={e => {
                const locationB = e.target.value
                this.setState({ locationB }, () =>
                  this.autocomplete(locationB, "B")
                )
              }}
              value={locationB || ""}
              type="value"
              placeholder="To..."
            />

            {inputLetter === "B" && autocompleteResults.length > 0 && (
              <Autocomplete>
                {autocompleteResults.map(str => (
                  <Text
                    onClick={() =>
                      this.setState({ locationB: str, autocompleteResults: [] })
                    }
                    style={{ margin: "8px 0", cursor: "pointer" }}
                    extraSmall
                  >
                    {str}
                  </Text>
                ))}
              </Autocomplete>
            )}

            <GrayLine glow={glow === "locationB"} />
          </div>
        )}

        {isNetworking ? (
          <Text color={colors.gray}>Searching...</Text>
        ) : (
          <Submit
            onClick={e => {
              e.preventDefault()
              this.search(locationA, locationB, locations, isSearchingRoute)
            }}
            type="submit"
            value="search"
            color={isSearchingDestination ? colors.orange : colors.blue}
          />
        )}

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
          <Header style={{ color: colors.gray, margin: 0 }}>VIEW ALL</Header>
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
