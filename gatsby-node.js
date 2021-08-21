const { google } = require('googleapis')

const START_DATE = '2021-08-18'
const END_DATE = 'today'
const METRIC = 'ga:pageviews'

const LOCATIONS = 'locations'
const GEO = 'geo'
const TECH = 'tech'

const jwt = new google.auth.JWT(
  process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_ANALYTICS_PRIVATE_KEY.replace(/\\n/gm, '\n'),
  'https://www.googleapis.com/auth/analytics.readonly'
)

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  await jwt.authorize()

  const geo_locations = await google.analytics('v3').data.ga.get({
    auth: jwt,
    ids: `ga:${process.env.GOOGLE_ANALYTICS_VIEW_ID}`,
    'start-date': START_DATE,
    'end-date': END_DATE,
    metrics: METRIC,
    dimensions: 'ga:city,ga:latitude,ga:longitude,ga:country,ga:countryIsoCode',
  })

  const stat_city = await google.analytics('v3').data.ga.get({
    auth: jwt,
    ids: `ga:${process.env.GOOGLE_ANALYTICS_VIEW_ID}`,
    'start-date': START_DATE,
    'end-date': END_DATE,
    metrics: METRIC,
    dimensions: 'ga:city',
  })

  const stat_country = await google.analytics('v3').data.ga.get({
    auth: jwt,
    ids: `ga:${process.env.GOOGLE_ANALYTICS_VIEW_ID}`,
    'start-date': START_DATE,
    'end-date': END_DATE,
    metrics: METRIC,
    dimensions: 'ga:country',
  })

  const stat_continent = await google.analytics('v3').data.ga.get({
    auth: jwt,
    ids: `ga:${process.env.GOOGLE_ANALYTICS_VIEW_ID}`,
    'start-date': START_DATE,
    'end-date': END_DATE,
    metrics: METRIC,
    dimensions: 'ga:continent',
  })

  const stat_browser = await google.analytics('v3').data.ga.get({
    auth: jwt,
    ids: `ga:${process.env.GOOGLE_ANALYTICS_VIEW_ID}`,
    'start-date': START_DATE,
    'end-date': END_DATE,
    metrics: METRIC,
    dimensions: 'ga:browser',
  })

  const stat_os = await google.analytics('v3').data.ga.get({
    auth: jwt,
    ids: `ga:${process.env.GOOGLE_ANALYTICS_VIEW_ID}`,
    'start-date': START_DATE,
    'end-date': END_DATE,
    metrics: METRIC,
    dimensions: 'ga:operatingSystem',
  })

  const stat_device = await google.analytics('v3').data.ga.get({
    auth: jwt,
    ids: `ga:${process.env.GOOGLE_ANALYTICS_VIEW_ID}`,
    'start-date': START_DATE,
    'end-date': END_DATE,
    metrics: METRIC,
    dimensions: 'ga:deviceCategory',
  })

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

  const city = stat_city.data.rows
    .map(([city, count]) => {
      return {
        city: city,
        count: count,
      }
    })
    .sort((a, b) => b.count - a.count)
    .splice(0, 1)
    .reduce((items, item) => {
      const { city, count } = item
      return {
        name: city,
        count: count,
      }
    }, {})

  const country = stat_country.data.rows
    .map(([country, count]) => {
      return {
        country: country,
        count: count,
      }
    })
    .sort((a, b) => b.count - a.count)
    .splice(0, 1)
    .reduce((items, item) => {
      const { country, count } = item
      return {
        name: country,
        count: count,
      }
    }, {})

  const continent = stat_continent.data.rows
    .map(([continent, count]) => {
      return {
        continent: continent,
        count: count,
      }
    })
    .sort((a, b) => b.count - a.count)
    .splice(0, 1)
    .reduce((items, item) => {
      const { continent, count } = item
      return {
        name: continent,
        count: count,
      }
    }, {})

  const browser = stat_browser.data.rows
    .map(([browser, count]) => {
      return {
        browser: browser,
        count: count,
      }
    })
    .sort((a, b) => b.count - a.count)
    .splice(0, 1)
    .reduce((items, item) => {
      const { browser, count } = item
      return {
        name: browser,
        count: count,
      }
    }, {})

  const os = stat_os.data.rows
    .map(([os, count]) => {
      return {
        os: os,
        count: count,
      }
    })
    .sort((a, b) => b.count - a.count)
    .splice(0, 1)
    .reduce((items, item) => {
      const { os, count } = item
      return {
        name: os,
        count: count,
      }
    }, {})

  const device = stat_device.data.rows
    .map(([device, count]) => {
      return {
        device: device,
        count: count,
      }
    })
    .sort((a, b) => b.count - a.count)
    .splice(0, 1)
    .reduce((items, item) => {
      const { device, count } = item
      return {
        name: device,
        count: count,
      }
      return items
    }, {})

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
