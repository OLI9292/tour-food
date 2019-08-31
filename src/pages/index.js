import React from "react"
import { navigate } from "gatsby"
import { uniq, uniqBy } from "lodash"

import SEO from "../components/seo"
import HeaderComponent from "../components/header"
import Search from "../components/search"

import searchByRoute from "../images/search-by-route.jpg"
import searchNearby from "../images/search-nearby.jpg"

import {
  Box,
  Header,
  SearchBoxes,
  SearchBox,
  Image,
} from "../components/common"

import { parseRow, reverseGeocode } from "../lib/helpers"

import colors from "../lib/colors"

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
      // searchType: "route",
    }
  }

  componentDidMount() {
    this.requestLocation()

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
    if (!navigator) return
    const hasPermissions = navigator.permissions !== undefined
    const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }

    const handlePosition = position => {
      if (!position || !position.coords) return
      const { latitude, longitude } = position.coords
      // https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse
      reverseGeocode(`${latitude},${longitude}`, address => {
        if (!address || this.state.locationA) return
        this.setState({ myLocation: `${MY_LOCATION_TEXT}${address}` })
      })
    }

    const getPostion = () =>
      navigator.geolocation.getCurrentPosition(
        handlePosition,
        err => console.log(`ERR: ${err.message}`),
        options
      )

    hasPermissions
      ? getPostion()
      : navigator.permissions.query({ name: "geolocation" }).then(res => {
          if (!res.state === "denied") getPostion()
        })
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
      searchType,
    } = this.state

    const selectSearchComponent = (
      <div
        style={{
          height: "calc(100vh - 60px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
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

        <Header
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
            textAlign: "center",
            lineHeight: "60px",
            boxSizing: "border-box",
            width: "100%",
            cursor: "pointer",
            color: "white",
            margin: 0,
            opacity: dataLoaded ? 1 : 0,
            transition: "opacity 0.5s",
          }}
        >
          VIEW ALL
        </Header>
      </div>
    )

    return (
      <Box style={{ backgroundColor: searchType ? "white" : colors.orange }}>
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
            searchType={searchType}
          />
        ) : (
          selectSearchComponent
        )}
      </Box>
    )
  }
}
