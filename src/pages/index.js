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
  FlexedDiv,
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
const MIN_DISTANCE_FROM_LOCATION = 20

const REVOKE_GEOLOCATION_PERMISSION = false
const RADII = [5, 10, 20].map(String)
const DEFAULT_RADIUS_INDEX = 1

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      seconds: 0,
      locations: [],
      autocompleteOptions: [],
      autocompleteResults: [],
      dataLoaded: false,
      radius: RADII[DEFAULT_RADIUS_INDEX],
      // searchType: "destination",
      // locationA: "Brooklyn, NY",
      // locationB: "Austin, TX",
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    this.requestLocation()

    if (REVOKE_GEOLOCATION_PERMISSION) {
      navigator.permissions.revoke({ name: "geolocation" })
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
            .slice(1)
            .map(parseRow)
            .filter(r => r),
          l => `${l.name} ${l.latitude} ${l.longitude}`
        )

        console.log(`Data loaded: ${locations.length} locations.`)

        const autocompleteOptions = uniq(
          locations.map(l => `${l.city}, ${l.state}`)
        )

        this.setState({
          locations,
          autocompleteOptions,
          timeout,
          dataLoaded: true,
        })
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
      (
        steps,
        addressA,
        addressB,
        startLocation,
        endLocation,
        isShortRoute,
        error
      ) => {
        if (!steps || error) return
        console.log(`Computing ${steps.length} steps.`)
        const MIN_DISTANCE_FROM_ENDPOINT = isShortRoute ? 0 : 10

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
          .filter(a => a.distanceFromRoute < parseInt(this.state.radius))
          .sort(
            (a, b) =>
              parseFloat(a.distanceFromRoute) - parseFloat(b.distanceFromRoute)
          )
          .map(({ location }) => {
            const distance = distanceInMiles(
              location.latitude,
              location.longitude,
              startLocation.lat,
              startLocation.lng
            )

            const distanceFromEnd = distanceInMiles(
              location.latitude,
              location.longitude,
              endLocation.lat,
              endLocation.lng
            )

            return { location, distance, distanceFromEnd }
          })
          .filter(
            a =>
              a.distance > MIN_DISTANCE_FROM_ENDPOINT &&
              a.distanceFromEnd > MIN_DISTANCE_FROM_ENDPOINT
          )
          .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
          .slice(0, MAX_RESULTS)

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
        if (!address || this.state.locationA) return
        this.setState({ locationA: address })
      })
    }

    if (permissions) {
      navigator.permissions.query({ name: "geolocation" }).then(result => {
        // granted / prompt / denied
        if (result.state === "denied") return

        navigator.geolocation.getCurrentPosition(
          handlePosition,
          err => console.log(`ERR: ${err.message}`),
          options
        )
      })
    } else {
      navigator.geolocation.getCurrentPosition(
        handlePosition,
        err => console.log(`ERR: ${err.message}`),
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

      const state = {
        description,
        results,
        locations,
        filterBy,
      }

      if (addressA && addressB) {
        state["route"] = { origin: addressA, destination: addressB }
      }

      navigate("/results", { state })
    })
  }

  render() {
    const {
      autocompleteResults,
      error,
      glow,
      dataLoaded,
      inputLetter,
      isNetworking,
      locationA,
      locationB,
      locations,
      searchType,
      radius,
      seconds,
      selectedAutocomplete,
    } = this.state

    const isSearchingDestination = searchType === "destination"
    const isSearchingRoute = searchType === "route"

    const searchNearbyHeader = (
      <Header
        style={{ margin: "10px 0" }}
        color={searchType ? colors.orange : "white"}
      >
        search by location
      </Header>
    )

    const searchByRouteHeader = (
      <Header
        style={{ margin: "10px 0" }}
        color={searchType ? colors.blue : "white"}
      >
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

            <FlexedDiv
              style={{
                fontFamily: "BrandonGrotesqueLight",
                justifyContent: "space-between",
                marginTop: "20px",
                textAlign: "left",
              }}
            >
              <Text small>Within</Text>
              <FlexedDiv
                style={{ flexGrow: 1, justifyContent: "space-around" }}
              >
                {RADII.map(r => (
                  <FlexedDiv
                    key={r}
                    style={{
                      justifyContent: "flex-end",
                      flexGrow: 1,
                      cursor: "pointer",
                    }}
                    onClick={() => this.setState({ radius: r })}
                  >
                    <input
                      checked={r === radius}
                      type="radio"
                      name={r}
                      value={r}
                    />
                    <Text small style={{ marginLeft: "5px" }}>
                      {r} miles
                    </Text>
                  </FlexedDiv>
                ))}
              </FlexedDiv>
            </FlexedDiv>
          </div>
        )}

        {isNetworking ? (
          <Text style={{ marginTop: "15px" }}>
            Searching{".".repeat(seconds)}
          </Text>
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
                  autocompleteResults[selectedAutocomplete]
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
      <div>
        <SearchBoxes>
          <SearchBox onClick={() => this.setState({ searchType: "route" })}>
            <Image src={searchByRoute} />
            {searchByRouteHeader}
          </SearchBox>

          <SearchBox
            onClick={() => this.setState({ searchType: "destination" })}
          >
            <Image src={searchNearby} />
            {searchNearbyHeader}
          </SearchBox>
        </SearchBoxes>

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
          style={{
            cursor: "pointer",
            position: "fixed",
            bottom: 0,
            width: "100vw",
            boxSizing: "border-box",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <Header
            style={{
              color: "white",
              margin: 0,
              opacity: dataLoaded ? 1 : 0,
              transition: "opacity 0.5s",
            }}
          >
            VIEW ALL
          </Header>
        </div>
      </div>
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
