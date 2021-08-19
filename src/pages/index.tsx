import React, { Fragment, FunctionComponent } from 'react'
import { Container, Grid, Box, Text } from 'theme-ui'

import ThreeScene from '../components/three-scene'
import GroovyHeading from '../components/groovy-heading'
import CommentForm from '../components/comment-form'

const IndexPage: FunctionComponent = () => {
  return (
    <Fragment>
      <Container
        sx={{
          pointerEvents: 'none',
        }}
      >
        <Grid
          sx={{
            placeItems: 'center',
            height: 'canvas',
          }}
        >
          <Grid
            sx={{
              gap: 0,
            }}
          >
            <GroovyHeading
              as="h1"
              variant="heading.h1"
              textAlign={['center', 'left']}
              justifyContent="center"
              text={['Groovy', 'Analytics']}
            />
            <Text as="p" sx={{ color: 'text', textAlign: 'center' }}>
              I'm just collecting analytics data at the moment. <br />
              Come back soon and you'll see your location on the globe.
            </Text>
          </Grid>
        </Grid>
      </Container>
      <ThreeScene />
      <Box
        as="section"
        sx={{
          backgroundColor: 'grey3',
          py: 5,
        }}
      >
        <Container>
          <Grid
            sx={{
              gap: 5,
            }}
          >
            <Box>
              <GroovyHeading
                as="h2"
                variant="heading.h2"
                color="primary"
                strokeColor="black1"
                textAlign="center"
                justifyContent="center"
                text={['Jive', "talkin'"]}
              />
              <Text
                as="p"
                sx={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}
              >
                If you aint just woofin leave a comment,
                <br />
                but make it fab -- square biz?
              </Text>
            </Box>
            <CommentForm />
          </Grid>
        </Container>
      </Box>
    </Fragment>
  )
}

export default IndexPage
