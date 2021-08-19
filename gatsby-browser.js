import React from 'react'
import { Auth0Provider } from '@auth0/auth0-react'

import RootElement from './src/components/root-element'
import PageElement from './src/components/page-element'

export const wrapPageElement = ({ element }) => {
  return <PageElement>{element}</PageElement>
}

export const wrapRootElement = ({ element }) => {
  return (
    <Auth0Provider
      domain={process.env.GATSBY_AUTH0_DOMAIN}
      clientId={process.env.GATSBY_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      audience={process.env.GATSBY_AUTH0_AUDIENCE}
    >
      <RootElement>{element}</RootElement>
    </Auth0Provider>
  )
}
