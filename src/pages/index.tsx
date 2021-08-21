import React, { Fragment, FunctionComponent } from 'react'
import { Container, Grid, Box, Text } from 'theme-ui'

import ThreeScene from '../components/three-scene'
import GroovyHeading from '../components/groovy-heading'
import CommentForm from '../components/comment-form'
import Comments from '../components/comments'
import Reactions from '../components/reactions'

import SvgRepeatingCircleBackground from '../components/svg-repeating-circle-background'

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

      {/* Comments -- start */}
      <Box
        as="section"
        sx={{
          position: 'relative',
          // backgroundColor: 'background',
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
              <Text as="p" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                If you aint just woofin leave a comment,
                <br />
                but make it fab -- square biz?
              </Text>
            </Box>
            <CommentForm />
            <Comments />
          </Grid>
        </Container>
        <SvgRepeatingCircleBackground backgroundColor="background" />
      </Box>
      {/* Comments --end */}

      {/* Reactions -- start */}
      <Box
        as="section"
        sx={{
          position: 'relative',

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
                color="background"
                strokeColor="primary"
                textAlign="center"
                justifyContent="center"
                text={['Gimmie', 'some', 'skin!']}
              />
              <Text
                as="p"
                sx={{
                  color: 'background',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                No Twitter? That aint no thang, leave a reaction.
                <br />
                Peace, love, and granola!
              </Text>
            </Box>

            <Reactions />
          </Grid>
        </Container>
        <SvgRepeatingCircleBackground backgroundColor="black" opacity={0.4} />
      </Box>
      {/* Reactions --end */}
    </Fragment>
  )
}

export default IndexPage
