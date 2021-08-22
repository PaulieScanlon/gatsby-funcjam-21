const { google } = require('googleapis')

const START_DATE = '2021-08-18'
const END_DATE = 'today'
const METRIC = 'ga:pageviews'
const FILTER = 'ga:city!=Worthing;ga:city!=Hastings'

const LOCATIONS = 'locations'
const GEO = 'geo'
const TECH = 'tech'

const jwt = new google.auth.JWT(
  process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_ANALYTICS_PRIVATE_KEY.replace(/\\n/gm, '\n'),
  'https://www.googleapis.com/auth/analytics.readonly'
)

const ga = async (dimensions) => {
  return await new Promise((resolve, reject) => {
    try {
      resolve(
        google.analytics('v3').data.ga.get({
          auth: jwt,
          ids: `ga:${process.env.GOOGLE_ANALYTICS_VIEW_ID}`,
          'start-date': START_DATE,
          'end-date': END_DATE,
          metrics: METRIC,
          dimensions: dimensions,
          filters: FILTER,
        })
      )
    } catch {
      reject(result)
    }
  })
}

const format = (data, key) => {
  return data
    .map(([name, count]) => {
      return {
        name: name,
        count: count,
      }
    })
    .sort((a, b) => b.count - a.count)
    .splice(0, 1)
    .reduce((items, item) => {
      const { name, count } = item
      return {
        name: key,
        count: count,
      }
    }, {})
}

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  await jwt.authorize()

  const geo_locations = await ga(
    'ga:city,ga:latitude,ga:longitude,ga:country,ga:countryIsoCode'
  )

  const locations = geo_locations.data.rows
    .map(([city, lat, lng, country, countryIsoCode, count]) => {
      return {
        city: city,
        lat: parseInt(lat),
        lng: parseInt(lng),
        country: country,
        country_code: countryIsoCode,
        count: parseInt(count),
      }
    })
    .sort((a, b) => a.country.localeCompare(b.country))
    .filter((item) => {
      if (item.country === '(not set)' || item.city === '(not set)') {
        return null
      } else {
        return item
      }
    })
    .forEach((location, index) => {
      const id = `${location.lat}${location.lng}-${index}`
      createNode({
        ...location,
        id: id,
        internal: {
          type: LOCATIONS,
          contentDigest: createContentDigest(id),
        },
      })
    })

  const stat_city = await ga('ga:city')
  const stat_country = await ga('ga:country')
  const stat_continent = await ga('ga:continent')
  const stat_browser = await ga('ga:browser')
  const stat_os = await ga('ga:operatingSystem')
  const stat_device = await ga('ga:deviceCategory')

  const city = format(stat_city.data.rows, 'city')
  const country = format(stat_country.data.rows, 'country')
  const continent = format(stat_continent.data.rows, 'continent')
  const browser = format(stat_browser.data.rows, 'browser')
  const os = format(stat_os.data.rows, 'os')
  const device = format(stat_device.data.rows, 'device')

  createNode({
    city: city,
    country: country,
    continent: continent,
    id: GEO,
    internal: {
      type: GEO,
      contentDigest: createContentDigest(`${city}-${country}-${continent}`),
    },
  })

  createNode({
    browser: browser,
    os: os,
    device: device,
    id: TECH,
    internal: {
      type: TECH,
      contentDigest: createContentDigest(`${browser}-${os}-${device}`),
    },
  })
}
