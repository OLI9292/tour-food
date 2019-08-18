import React from "react"
import { navigate } from "gatsby"
import { isNumber, uniq, uniqBy } from "lodash"

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
  reverseGeocode,
  distanceFromLine,
  directions,
  distanceInMiles,
} from "../lib/helpers"

import colors from "../lib/colors"

const DATA_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSba72Al-RA3rUkBruesaJpLe8A5pIm-EJ8ZvY5SeSIzJWi8sebSnNqBTckypxCCyEhk2UaWvD_6Kfe/pub?output=csv"

const MAX_RESULTS = 75

const MIN_DISTANCE_FROM_LOCATION = 25
const MIN_DISTANCE_FROM_ROUTE = 30
const REVOKE_GEOLOCATION_PERMISSION = true

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      seconds: 0,
      locations: [],
      autocompleteOptions: [],
      autocompleteResults: [],
      // searchType: "destination",
      // locationA: "Brooklyn, NY",
      // locationB: "Austin, TX",
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    if (REVOKE_GEOLOCATION_PERMISSION) {
      // navigator.permissions.revoke({ name: "geolocation" })
    }

    document.addEventListener("keydown", this.handleKeyDown, false)

    const timeout = setInterval(() => {
      let { seconds } = this.state
      seconds = seconds === 3 ? 1 : seconds + 1
      this.setState({ seconds })
    }, 1000)

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
        this.setState({ locations, autocompleteOptions, timeout })
      })
  }

  componentWillUnmount() {
    clearInterval(this.state.timeout)
    document.removeEventListener("keydown", this.handleKeyDown, false)
  }

  autocomplete(inputString, inputLetter) {
    inputString = inputString.toLowerCase()
    const autocompleteResults = inputString.length
      ? this.state.autocompleteOptions
          .filter(
            str =>
              str.toLowerCase().startsWith(inputString) &&
              str.toLowerCase() !== inputString
          )
          .slice(0, 4)
      : []
    this.setState({ autocompleteResults, inputLetter })
  }

  async findAlongRoute(locations, cb) {
    console.log("Find along route:", locations)
    directions(
      locations[0],
      locations[1],
      (steps, addressA, addressB, startLocation, error) => {
        if (!steps) return
        console.log(`Computing ${steps.length} steps.`)

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
          .filter(a => a.distanceFromRoute < MIN_DISTANCE_FROM_ROUTE)
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

  async findNearLocation(locations, cb) {
    console.log("Find nearby:", locations[0])
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
        .filter(a => a.distance < MIN_DISTANCE_FROM_LOCATION)
        .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
        .slice(0, MAX_RESULTS)
      cb(results, address)
    })
  }

  glowInput(glow) {
    if (this.state.glow) return
    const error = `Please enter a ${
      glow.includes("A") ? "location" : "destination"
    }.`
    this.setState({ glow, error })
    setTimeout(() => this.setState({ glow: undefined }), 1000)
  }

  handleKeyDown(e) {
    const {
      autocompleteResults,
      inputLetter,
      selectedAutocomplete,
    } = this.state

    const goUp = e.key.toLowerCase().includes("up")
    const goDown = e.key.toLowerCase().includes("down")
    if (autocompleteResults.length === 0 || (!goUp && !goDown)) return

    let index
    if (goDown) {
      index = isNumber(selectedAutocomplete)
        ? Math.min(autocompleteResults.length - 1, selectedAutocomplete + 1)
        : 0
    } else if (selectedAutocomplete) {
      index = Math.max(0, selectedAutocomplete - 1)
    }
    if (!isNumber(index)) return

    const state = { selectedAutocomplete: index }
    const result = autocompleteResults[index]
    state[inputLetter === "A" ? "locationA" : "locationB"] = result
    this.setState(state)
  }

  requestLocation() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API/Using_the_Permissions_API
    if (!navigator) return
    const permissions = navigator.permissions !== undefined
    const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }

    const handlePosition = position => {
      if (!position || !position.coords) return
      const { latitude, longitude } = position.coords
      // https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse
      reverseGeocode(`${latitude},${longitude}`, address => {
        if (!address) return
        this.setState({ locationA: address })
      })
    }

    if (permissions) {
      navigator.permissions.query({ name: "geolocation" }).then(result => {
        // granted / prompt / denied
        if (result.state === "denied") return

        navigator.geolocation.getCurrentPosition(
          handlePosition,
          err => console.log(`ERR: ${err}`),
          options
        )
      })
    } else {
      navigator.geolocation.getCurrentPosition(
        handlePosition,
        err => console.log(`ERR: ${err}`),
        options
      )
    }
  }

  reset() {
    this.setState({
      autocompleteResults: [],
      error: undefined,
      locationA: undefined,
      locationB: undefined,
      results: undefined,
      searchType: undefined,
      selectedAutocomplete: undefined,
    })
  }

  search(locationA, locationB, locations, isSearchingRoute) {
    if (!locationA) return this.glowInput("locationA")
    if (isSearchingRoute && !locationB) return this.glowInput("locationB")
    this.setState({ isNetworking: true, error: undefined })

    const fn = isSearchingRoute
      ? this.findAlongRoute.bind(this)
      : this.findNearLocation.bind(this)

    fn([locationA, locationB], (results, addressA, addressB) => {
      console.log(`Found ${results.length} locations.`)
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

      const filterBy = { state: undefined, city: undefined, tag: undefined }

      if (!isSearchingRoute) {
        const autocompleteOption = locations.find(
          l => `${l.city}, ${l.state}` === locationA
        )
        if (autocompleteOption) {
          filterBy["city"] = autocompleteOption.city
          filterBy["state"] = autocompleteOption.state
        }
      }
      console.log(filterBy)

      const state = { description, results, locations, filterBy }
      navigate("/results", { state })
    })
  }

  render() {
    const {
      autocompleteResults,
      error,
      glow,
      inputLetter,
      isNetworking,
      locationA,
      locationB,
      locations,
      searchType,
      seconds,
      selectedAutocomplete,
    } = this.state

    const isSearchingDestination = searchType === "destination"
    const isSearchingRoute = searchType === "route"

    const searchNearbyHeader = (
      <Header color={searchType ? colors.orange : "white"}>
        search by location
      </Header>
    )

    const searchByRouteHeader = (
      <Header color={searchType ? colors.blue : "white"}>
        search by route
      </Header>
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
              {autocompleteResults.map((str, idx) => (
                <Text
                  key={idx}
                  color={idx === selectedAutocomplete ? colors.orange : "black"}
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
                {autocompleteResults.map((str, idx) => (
                  <Text
                    key={idx}
                    onClick={() =>
                      this.setState({
                        locationB: str,
                        autocompleteResults: [],
                      })
                    }
                    color={
                      idx === selectedAutocomplete ? colors.orange : "black"
                    }
                    style={{ margin: "8px 0", cursor: "pointer" }}
                    small
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
          <Text color={colors.gray}>Searching{".".repeat(seconds)}</Text>
        ) : (
          <Submit
            onClick={e => {
              e.preventDefault()
              const selectAutocomplete =
                autocompleteResults.length && isNumber(selectedAutocomplete)
              if (selectAutocomplete) {
                const state = {
                  autocompleteResults: [],
                  selectedAutocomplete: undefined,
                }
                state[`location${inputLetter}`] =
                  autocompleteResults[selectAutocomplete]
                console.log(state)
                this.setState(state)
              } else {
                this.search(locationA, locationB, locations, isSearchingRoute)
              }
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

        <SearchBox
          onClick={() =>
            this.setState({ searchType: "destination" }, this.requestLocation)
          }
        >
          <Image style={{ backgroundImage: `url("${searchNearby}")` }} />
          {searchNearbyHeader}
        </SearchBox>

        <div
          onClick={() => {
            if (!locations.length) return
            const filterBy = {
              state: undefined,
              city: undefined,
              tag: undefined,
            }
            navigate("/results", {
              state: { results: [], locations, filterBy },
            })
          }}
          style={{ cursor: "pointer", flex: 1, marginTop: "10px" }}
        >
          <Header style={{ color: "white", margin: 0 }}>VIEW ALL</Header>
        </div>
      </SearchBoxes>
    )

    return (
      <Box style={{ backgroundColor: searchType ? "white" : colors.orange }}>
        <SEO title="Home" />

        <HeaderComponent reset={this.reset.bind(this)} siteTitle="Tour Food" />

        {searchType ? searchComponent : selectSearchComponent}
      </Box>
    )
  }
}
