const BASE_GEOCODING_URL =
  "https://maps.googleapis.com/maps/api/geocode/json?address="

const API_KEY = "&key=" + process.env.GATSBY_GOOGLE_API_KEY

export const parseRow = row => {
  const data = row.split(",")
  const name = data[0]
  const city = data[1]
  const state = data[2]
  const latitude = parseFloat(data[3], 10)
  const longitude = parseFloat(data[4], 10)
  return { name, city, state, latitude, longitude }
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
