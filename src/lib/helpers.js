import * as geolib from "geolib"
import { groupBy, countBy, sortBy, isNaN } from "lodash"

const BASE_GEOCODING_URL =
  "https://maps.googleapis.com/maps/api/geocode/json?address="

const BASE_REVERSE_GEOCODING_URL =
  "https://maps.googleapis.com/maps/api/geocode/json?latlng="

const BASE_DIRECTIONS_URL =
  "https://maps.googleapis.com/maps/api/directions/json?"

const PROXY_URL = "https://cors-anywhere.herokuapp.com/"

const API_KEY = "&key=AIzaSyBdXkVtyeTG0wf51sEXEEZLyMqvFkoyEqE" // + process.env.GATSBY_GOOGLE_API_KEY

const cleanRow = row =>
  row
    .trim()
    .split(/,(?=(?:(?:[^"]*(?:")){2})*[^"]*$)/)
    .map(str => {
      str = str.trim()
      return str.startsWith('"') && str.endsWith('"') ? str.slice(1, -1) : str
    })

const LOG_ERRORS = true

export const parseRow = (row, idx) => {
  try {
    const data = cleanRow(row)

    const result = {
      name: data[0],
      city: data[1],
      state: data[2],
      tags: data[4]
        .split(",")
        .map(str => str.trim())
        .filter(t => t),
      comments: data[5],
      latitude: parseFloat(data[8], 10),
      longitude: parseFloat(data[9], 10),
      url: data[10],
    }

    const attributes = ["name", "city", "state", "latitude", "longitude"]

    attributes.forEach(attr => {
      if (!result[attr]) {
        if (LOG_ERRORS) {
          console.log(`ERR: row ${idx + 1} missing field ${attr}: ${row}`)
        }
        return
      }
    })

    if (["latitude", "longitude"].some(attr => isNaN(result[attr]))) {
      if (LOG_ERRORS) {
        console.log(`ERR: row ${idx + 1} invalid lat/lng: ${row}`)
      }
      return
    }

    return result
  } catch (error) {
    if (LOG_ERRORS) {
      console.log(`ERR: failed to parse row ${idx + 1}: ${row}`)
    }
  }
}

export const geocode = (addressStr, cb) => {
  const url = BASE_GEOCODING_URL + addressStr + API_KEY
  console.log(`Fetching ${url}.`)
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(`Google API geocoding received.`)

      try {
        const result = data["results"][0]
        const { lat, lng } = result["geometry"]["location"]
        const address = result["formatted_address"].replace(", USA", "")
        cb(lat, lng, address)
      } catch (error) {
        cb(null, null, null, `Could not find ${addressStr}.`)
      }
    })
}

export const reverseGeocode = (latLng, cb) => {
  const url = BASE_REVERSE_GEOCODING_URL + latLng + API_KEY
  console.log(`Fetching ${url}.`)
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(`Google API reverse geocoding received.`)

      try {
        const result = data["results"][0]
        const { lat, lng } = result["geometry"]["location"]
        const address = result["formatted_address"]
          .replace(", USA", "")
          .replace(/\d+$/, "")
          .trim()
        cb(address)
      } catch (error) {
        cb(null, `Could not find ${latLng}.`)
      }
    })
}

export const directions = (origin, destination, cb) => {
  const url = `${PROXY_URL}${BASE_DIRECTIONS_URL}origin=${origin}&destination=${destination}${API_KEY}`
  // const url = `${BASE_DIRECTIONS_URL}origin=${origin}&destination=${destination}${API_KEY}`
  // console.log(`Fetching ${url}.`)
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(`Google API directions received.`)

      try {
        let {
          steps,
          start_address,
          start_location,
          end_address,
          end_location,
        } = data["routes"][0]["legs"][0]

        steps = steps
          .filter(step => step.distance.value > 1000)
          .map(step => ({ start: step.start_location, end: step.end_location }))

        cb(
          steps,
          start_address.replace(", USA", ""),
          end_address.replace(", USA", ""),
          start_location,
          end_location
        )
      } catch (error) {
        const message = `Could not find directions from ${origin} to ${destination}.`
        cb(null, null, null, null, message)
      }
    })
    .catch(error => console.log(error))
}

// https://github.com/google-map-react/google-map-react/blob/master/API.md
export const getBounds = results => {
  let BUFFER = 0.05

  if (results.length === 1) {
    const { latitude, longitude } = results[0].location

    return {
      nw: { lat: latitude + BUFFER, lng: longitude - BUFFER },
      se: { lat: latitude - BUFFER, lng: longitude + BUFFER },
    }
  }

  const latitudes = results.map(r => r.location.latitude)
  const longitudes = results.map(r => r.location.longitude)

  const maxLat = Math.max(...latitudes)
  const minLat = Math.min(...latitudes)
  const maxLong = Math.max(...longitudes)
  const minLong = Math.min(...longitudes)

  const multiplier = Math.max(
    Math.abs(maxLat - minLat),
    Math.abs(maxLong - minLong),
    1
  )
  BUFFER = Math.min(1, BUFFER * multiplier)

  return {
    nw: { lat: maxLat + BUFFER, lng: minLong - BUFFER },
    se: { lat: minLat - BUFFER, lng: maxLong + BUFFER },
  }
}

export const unique = (locations, attr) => {
  const elements =
    attr === "tags"
      ? [].concat(...locations.map(l => l[attr]))
      : locations.map(l => l[attr])

  return Array.from(new Set(elements))
    .filter(elem => elem)
    .sort()
}

export const distanceInMiles = (latA, lngA, latB, lngB) =>
  geolib.getDistance(
    { latitude: latA, longitude: lngA },
    { latitude: latB, longitude: lngB }
  ) / 1609.344

export const distanceFromLine = (
  latitude,
  longitude,
  lineLatA,
  lineLngA,
  lineLatB,
  lineLngB
) =>
  geolib.getDistanceFromLine(
    {
      latitude,
      longitude,
    },
    { latitude: lineLatA, longitude: lineLngA },
    { latitude: lineLatB, longitude: lineLngB }
  ) / 1609.344

export const getFilterOptions = (locations, filterBy, MAX_FILTER_OPTIONS) => {
  console.log(`Getting filter options for ${locations.length} locations.`)
  const tagCounts = countBy([].concat(...locations.map(l => l.tags)))

  let tagOptions = sortBy(Object.keys(tagCounts), t => tagCounts[t])
    .reverse()
    // .slice(0, MAX_FILTER_OPTIONS)
    .sort()

  let tagsMap = new Map(tagOptions.map(l => [l.toLowerCase(), l]))
  tagOptions = Array.from(tagsMap.values())

  const cities = unique(locations, "city")

  const groupedByCity = groupBy(locations, "city")

  const topCities = sortBy(cities, c => groupedByCity[c].length)
    .reverse()
    .slice(0, MAX_FILTER_OPTIONS)
    .sort()

  const filterOptions = {
    state: unique(locations, "state"),
    city: unique(locations, "city"),
    topCities: topCities,
    tag: tagOptions,
  }

  return { filterOptions, filterBy }
}
