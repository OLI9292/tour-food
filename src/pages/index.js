import React from "react"
import { navigate } from "gatsby"
import { uniq, uniqBy } from "lodash"

import SEO from "../components/seo"
import HeaderComponent from "../components/header"
import Search from "../components/search"

import {
  Box,
  Text,
  Header,
  SelectSearchBox,
  SearchBoxes,
  SearchBox,
  Image,
} from "../components/common"

import { parseRow, reverseGeocode } from "../lib/helpers"

import colors from "../lib/colors"

const searchByRoute = require(`../images/search-by-route.png`)

const searchNearby = require(`../images/search-nearby.png`)

const DATA_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSba72Al-RA3rUkBruesaJpLe8A5pIm-EJ8ZvY5SeSIzJWi8sebSnNqBTckypxCCyEhk2UaWvD_6Kfe/pub?output=csv"

const MY_LOCATION_TEXT = "My Location - "

const REVOKE_GEOLOCATION_PERMISSION = false

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      autocompleteOptions: [],
      autocompleteResults: [],
      dataLoaded: false,
      locations: [],
      isLoading: true,
      // searchType: "route",
    }
  }

  componentDidMount() {
    window.locationResults = undefined
    window.searchProps = undefined

    this.requestLocation()
    this.setState({ isLoading: false })

    if (REVOKE_GEOLOCATION_PERMISSION) {
      navigator.permissions.revoke({ name: "geolocation" })
    }

    window.locations ? this.setData(window.locations) : this.loadData()
  }

  loadData() {
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
        window.locations = locations
        this.setData(locations)
      })
  }

  setData(locations) {
    console.log(`Data loaded: ${locations.length} locations.`)

    const autocompleteOptions = uniq(
      locations.map(l => `${l.city}, ${l.state}`)
    )

    this.setState({
      locations,
      autocompleteOptions,
      dataLoaded: true,
    })
  }

  requestLocation() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API/Using_the_Permissions_API
    if (!navigator) return console.log("Navigator is undefined")

    const hasPermissions = navigator.permissions !== undefined
    console.log(`Has permissions: ${hasPermissions}`)
    const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }

    const handlePosition = position => {
      if (!position || !position.coords) return
      const { latitude, longitude } = position.coords
      console.log(`Position: ${latitude}, ${longitude}`)
      // https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse
      reverseGeocode(`${latitude},${longitude}`, address => {
        if (!address || this.state.locationA) return
        this.setState({
          myLocation: `${MY_LOCATION_TEXT}${address}`,
          myLocationCoordinates: [latitude, longitude],
        })
      })
    }

    const getPostion = () => {
      console.log("Getting position")
      navigator.geolocation.getCurrentPosition(
        handlePosition,
        err => console.log(`ERR: ${err.message}`),
        options
      )
    }

    hasPermissions
      ? navigator.permissions.query({ name: "geolocation" }).then(res => {
          if (res.state !== "denied") getPostion()
        })
      : getPostion()
  }

  reset() {
    this.setState({
      autocompleteResults: [],
      results: undefined,
      searchType: undefined,
    })
  }

  render() {
    const {
      autocompleteOptions,
      dataLoaded,
      locations,
      myLocation,
      myLocationCoordinates,
      searchType,
    } = this.state

    const selectSearchComponent = (
      <SelectSearchBox>
        <SearchBoxes>
          <SearchBox onClick={() => this.setState({ searchType: "route" })}>
            <Image src={searchByRoute} />

            <Header style={{ margin: 0, lineHeight: "40px" }} color={"white"}>
              search by route
            </Header>
          </SearchBox>

          <SearchBox
            onClick={() => this.setState({ searchType: "destination" })}
          >
            <Image src={searchNearby} />

            <Header style={{ margin: 0, lineHeight: "40px" }} color={"white"}>
              search by location
            </Header>
          </SearchBox>
        </SearchBoxes>

        <Text
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
          color="white"
          style={{
            textAlign: "center",
            lineHeight: "60px",
            letterSpacing: "1.5px",
            boxSizing: "border-box",
            width: "100%",

            cursor: "pointer",
            margin: 0,
            opacity: dataLoaded ? 1 : 0,
            transition: "opacity 0.5s",
          }}
        >
          VIEW ALL
        </Text>
      </SelectSearchBox>
    )

    if (this.state.isLoading) {
      return (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            backgroundColor: colors.orange,
          }}
        />
      )
    }

    const backgroundImage = searchType
      ? `url(${require(`../images/backgrounds/${searchType}.png`)})`
      : undefined

    return (
      <Box
        style={{
          backgroundColor: searchType ? "white" : colors.orange,
          backgroundImage,
          backgroundPositionY: "100%",
        }}
      >
        <SEO title="Home" />

        <HeaderComponent
          searchProps={{}}
          reset={this.reset.bind(this)}
          siteTitle="Tour Food"
        />

        {searchType ? (
          <Search
            autocompleteOptions={autocompleteOptions}
            locations={locations}
            miniature={false}
            myLocation={myLocation}
            myLocationCoordinates={myLocationCoordinates}
            searchType={searchType}
          />
        ) : (
          selectSearchComponent
        )}
      </Box>
    )
  }
}
