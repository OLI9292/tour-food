import React from "react"
import { navigate } from "gatsby"
import { isNumber } from "lodash"

import {
  Text,
  Input,
  InputBox,
  InputBoxes,
  Header,
  Autocomplete,
  GrayLine,
  Submit,
  Form,
  SubmitIcon,
  FlexedDiv,
} from "../components/common"

import colors from "../lib/colors"

import {
  geocode,
  distanceFromLine,
  directions,
  distanceInMiles,
} from "../lib/helpers"

import iconRight from "../images/icon-right.png"

const DEFAULT_RADIUS_INDEX = 1
const MAX_RESULTS_FROM_LOCATION = 100
const MAX_RESULTS_FROM_ROUTE = 200
const MIN_DISTANCE_FROM_LOCATION = 20
const MY_LOCATION_TEXT = "My Location - "
const RADII = [5, 10, 20].map(String)

export default class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      autocompleteResults: [],
      inputLetter: "A",
      radius: RADII[DEFAULT_RADIUS_INDEX],
      seconds: 0,
      // locationA: "Dallas, TX",
      // locationB: "Fort Collins, CO",
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    const { route } = this.props
    document.addEventListener("keydown", this.handleKeyDown, false)

    const timeout = setInterval(() => {
      let { seconds } = this.state
      seconds = seconds === 3 ? 1 : seconds + 1
      this.setState({ seconds })
    }, 1000)

    const state = { timeout }

    if (route) {
      state.locationA = route.origin
      state.locationB = route.destination
    }

    this.setState(state)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false)
    clearTimeout(this.state.timeout)
  }

  autocomplete(inputString = "", inputLetter = "A") {
    const { autocompleteOptions, myLocation } = this.props

    inputString = inputString.toLowerCase()
    let autocompleteResults = inputString.length
      ? autocompleteOptions
          .filter(
            str =>
              str.toLowerCase().startsWith(inputString) &&
              str.toLowerCase() !== inputString
          )
          .slice(0, 4)
      : []
    if (myLocation) autocompleteResults.unshift(myLocation)
    this.setState({ autocompleteResults, inputLetter })
  }

  async findAlongRoute(locations, cb) {
    console.log("Find along route:", locations)
    directions(
      locations[0],
      locations[1],
      (steps, addressA, addressB, startLocation, error) => {
        if (error) return this.setState({ error, isNetworking: false })
        console.log(`Computing ${steps.length} steps.`)

        const results = this.props.locations
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

            return { location, distance }
          })
          .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
          .slice(0, MAX_RESULTS_FROM_ROUTE)

        cb(results, addressA, addressB)
      }
    )
  }

  async findNearLocation(locations, cb) {
    console.log("Find nearby:", locations[0])
    geocode(locations[0], (lat, lng, address, error) => {
      if (error) return this.setState({ error, isNetworking: false })

      const results = this.props.locations
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
        .slice(0, MAX_RESULTS_FROM_LOCATION)
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
    const submit = e.key.toLowerCase().includes("enter")

    if (submit && this.props.miniature) return this.handleSubmit()

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
    const result = autocompleteResults[index].replace(MY_LOCATION_TEXT, "")
    state[inputLetter === "A" ? "locationA" : "locationB"] = result
    this.setState(state)
  }

  handleSubmit(e) {
    if (e) e.preventDefault()

    const { locations, searchType } = this.props

    const {
      autocompleteResults,
      inputLetter,
      locationA,
      locationB,
      selectedAutocomplete,
    } = this.state

    const isSearchingRoute = searchType === "route"
    const selectAutocomplete =
      autocompleteResults.length && isNumber(selectedAutocomplete)

    if (selectAutocomplete) {
      const state = {
        autocompleteResults: [],
        selectedAutocomplete: undefined,
      }
      state[`location${inputLetter}`] = autocompleteResults[
        selectedAutocomplete
      ].replace(MY_LOCATION_TEXT, "")
      this.setState(state)
    } else {
      this.search(locationA, locationB, locations, isSearchingRoute)
    }
  }

  rescale() {
    const scale = "scale(1)"
    document.body.style.webkitTransform = scale
    document.body.style.msTransform = scale
    document.body.style.transform = scale
  }

  search(locationA, locationB, locations, isSearchingRoute) {
    this.rescale()

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

      const {
        autocompleteOptions,
        myLocation,
        searchType,
        miniature,
      } = this.props

      const route = { origin: addressA, destination: addressB }

      if (typeof window !== "undefined") {
        window.searchProps = {
          searchType,
          autocompleteOptions,
          myLocation,
          locations,
          route,
        }
      }

      const state = {
        description,
        results,
        locations,
        filterBy,
      }

      addressA && addressB
        ? (state["route"] = route)
        : (state["location"] = addressA)

      miniature
        ? this.props.reset({ location: { state } })
        : navigate(`/results`, { state })
    })
  }

  render() {
    const { miniature, searchType } = this.props

    const {
      autocompleteResults,
      error,
      inputLetter,
      isNetworking,
      locationA,
      locationB,
      glow,
      radius,
      seconds,
      selectedAutocomplete,
    } = this.state

    const isSearchingDestination = searchType === "destination"

    const header = (
      <div style={{ margin: "40px 0" }}>
        <Header style={{ margin: "10px 0" }} color={colors.blue}>
          search by {isSearchingDestination ? "location" : "route"}
        </Header>
      </div>
    )

    const withinFilter = (
      <FlexedDiv
        style={{
          fontFamily: "BrandonGrotesqueLight",
          justifyContent: "space-between",
          marginTop: "20px",
          textAlign: "left",
        }}
      >
        <Text small>Within</Text>
        <FlexedDiv style={{ flexGrow: 1, justifyContent: "space-around" }}>
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
                readOnly
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
    )

    const submit = miniature ? (
      <SubmitIcon
        isNetworking={isNetworking}
        onClick={this.handleSubmit.bind(this)}
        src={iconRight}
      />
    ) : isNetworking ? (
      <Text style={{ marginTop: "15px" }}>Searching{".".repeat(seconds)}</Text>
    ) : (
      <Submit
        onClick={this.handleSubmit.bind(this)}
        type="submit"
        value="search"
        color={colors.blue}
      />
    )

    return (
      <Form miniature={miniature}>
        {!miniature && header}

        <InputBoxes miniature={miniature}>
          <InputBox miniature={miniature}>
            <Input
              miniature={miniature}
              spellCheck={false}
              onChange={e => {
                const locationA = e.target.value
                this.setState({ locationA }, () =>
                  this.autocomplete(locationA, "A")
                )
              }}
              value={locationA || ""}
              type="value"
              autoFocus={!miniature}
              placeholder={
                isSearchingDestination
                  ? "Location (venue, city, etc.)"
                  : "From (venue, city, etc.)"
              }
            />

            {inputLetter === "A" && autocompleteResults.length > 0 && (
              <Autocomplete>
                {autocompleteResults.map((str, idx) => {
                  const isMyLocation = str.includes(MY_LOCATION_TEXT)

                  const color =
                    idx === selectedAutocomplete
                      ? colors.orange
                      : isMyLocation
                      ? colors.blue
                      : "black"

                  return (
                    <Text
                      key={idx}
                      color={color}
                      onClick={() =>
                        this.setState({
                          locationA: str.replace(MY_LOCATION_TEXT, ""),
                          autocompleteResults: [],
                        })
                      }
                      style={{ margin: "8px 0", cursor: "pointer" }}
                      small
                    >
                      {isMyLocation ? MY_LOCATION_TEXT.split(" - ")[0] : str}
                    </Text>
                  )
                })}
              </Autocomplete>
            )}

            <GrayLine miniature={miniature} glow={glow === "locationA"} />
          </InputBox>

          {searchType === "route" && (
            <InputBox destination={true} miniature={miniature}>
              <Input
                miniature={miniature}
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
                  {autocompleteResults.map((str, idx) => {
                    const isMyLocation = str.includes(MY_LOCATION_TEXT)

                    const color =
                      idx === selectedAutocomplete
                        ? colors.orange
                        : isMyLocation
                        ? colors.blue
                        : "black"

                    return (
                      <Text
                        key={idx}
                        onClick={() =>
                          this.setState({
                            locationB: str.replace(MY_LOCATION_TEXT, ""),
                            autocompleteResults: [],
                          })
                        }
                        color={color}
                        style={{ margin: "8px 0", cursor: "pointer" }}
                        small
                      >
                        {isMyLocation ? MY_LOCATION_TEXT.split(" - ")[0] : str}
                      </Text>
                    )
                  })}
                </Autocomplete>
              )}

              <GrayLine miniature={miniature} glow={glow === "locationB"} />

              {!miniature && withinFilter}
            </InputBox>
          )}
        </InputBoxes>

        {submit}

        {error && (
          <Text small color={colors.red} style={{ marginTop: "15px" }}>
            {error}
          </Text>
        )}
      </Form>
    )
  }
}
