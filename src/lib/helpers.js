const BASE_GEOCODING_URL =
  "https://maps.googleapis.com/maps/api/geocode/json?address="

const API_KEY = "&key=" + process.env.GATSBY_GOOGLE_API_KEY

const cleanRow = row =>
  row
    .trim()
    .split(/,(?=(?:(?:[^"]*(?:")){2})*[^"]*$)/)
    .map(str => {
      str = str.trim()
      return str.startsWith('"') && str.endsWith('"') ? str.slice(1, -1) : str
    })

export const parseRow = row => {
  try {
    const data = cleanRow(row)

    const result = {
      name: data[0],
      city: data[1],
      state: data[2],
      tags: data[4].split(",").map(str => str.trim()),
      comments: data[5],
      latitude: parseFloat(data[8], 10),
      longitude: parseFloat(data[9], 10),
      url: data[10],
    }

    if (
      !result.name ||
      !result.city ||
      !result.state ||
      !result.latitude ||
      !result.longitude
    ) {
      console.log("ERR: failed to parse\n", row, "\n", result, "\n")
      return
    }

    return result
  } catch (error) {
    console.log(`ERR: failed to parse ${row}`)
  }
}

export const geocode = (addressStr, cb) =>
  fetch(BASE_GEOCODING_URL + addressStr + API_KEY)
    .then(res => res.json())
    .then(data => {
      try {
        const { lat, lng } = data["results"][0]["geometry"]["location"]
        cb(lat, lng)
      } catch (error) {
        console.log("ERR:", error)
        throw new Error(`Could not geocode location: ${addressStr}`)
      }
    })

// https://github.com/google-map-react/google-map-react/blob/master/API.md
export const getBounds = results => {
  const latitudes = results.map(r => r.location.latitude)
  const longitudes = results.map(r => r.location.longitude)

  const maxLat = Math.max(...latitudes)
  const minLat = Math.min(...latitudes)
  const maxLong = Math.max(...longitudes)
  const minLong = Math.min(...longitudes)

  return {
    nw: { lat: maxLat, lng: minLong },
    se: { lat: minLat, lng: maxLong },
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
