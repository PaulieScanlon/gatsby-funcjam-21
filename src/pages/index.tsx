import React, { Fragment, FunctionComponent } from 'react'
import { Container, Grid, Box, Text, Link } from 'theme-ui'

import ThreeScene from '../components/three-scene'
import GroovyHeading from '../components/groovy-heading'
import CommentForm from '../components/comment-form'
import Comments from '../components/comments'
import Reactions from '../components/reactions'
import NewsletterForm from '../components/newsletter-form'
import GeoStats from '../components/geo-stats'
import TechStats from '../components/tech-stats'

import SvgRepeatingCircleBackground from '../components/svg-repeating-circle-background'

const IndexPage: FunctionComponent = () => {
  return (
    <Fragment>
      <Container>
        <Grid
          sx={{
            placeItems: 'center',
            height: ['50vh', 'canvas'],
          }}
        >
          <Grid>
            <GroovyHeading
              as="h1"
              variant="heading.h1"
              textAlign={['center', 'left']}
              justifyContent="center"
              text={['Groovy', 'Analytics']}
            />
            <Text
              sx={{
                color: 'background',
                mx: 'auto',
              }}
            >
              A{' '}
              <Link
                href="https://twitter.com/hashtag/FuncJam?src=hashtag_click"
                target="_blank"
                rel="noopener"
                sx={{ color: 'primary', fontWeight: 'bold' }}
              >
                #FuncJam
              </Link>{' '}
              site by{' '}
              <Link
                href="https://twitter.com/PaulieScanlon"
                target="_blank"
                rel="noopener"
                sx={{ color: 'tertiary', fontWeight: 'bold' }}
              >
                @PaulieScanlon
              </Link>
            </Text>
            <Text
              sx={{
                color: 'background',
                textAlign: 'center',
              }}
            >
              You can read all about how I made this site over on my blog{' '}
              <Link
                href="https://paulie.dev/posts/2021/08/gatsby-func-jam-21/"
                target="_blank"
                rel="noopener"
                sx={{ color: 'tertiary', fontWeight: 'bold' }}
              >
                https://paulie.dev
              </Link>
            </Text>
          </Grid>
        </Grid>
      </Container>

      <ThreeScene />

      {/* Geo Stats -- start */}
      <Box
        as="section"
        sx={{
          position: 'relative',
          pt: [5, 6],
          pb: 5,
        }}
      >
        <Container>
          <Grid
            sx={{
              gap: 5,
            }}
          >
            <Grid>
              <GroovyHeading
                as="h2"
                variant="heading.h2"
                color="primary"
                strokeColor="black1"
                textAlign="center"
                justifyContent="center"
                text={['Keep', 'on', "steppin'"]}
              />
              <Text as="p" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                Some real far out folks have visited this site,
                <br />
                and here’s where they’re from.
              </Text>
            </Grid>
            <GeoStats />
            <Text
              sx={{
                mx: 'auto',
                textAlign: 'center',
              }}
            >
              Location statistics provided by{' '}
              <Link
                href="https://developers.google.com/analytics/devguides/reporting/core/v3"
                target="_blank"
                rel="noopener"
                sx={{ color: 'primary', fontWeight: 'bold' }}
              >
                Google Analytics Core Reporting API -- v3
              </Link>
            </Text>
          </Grid>
        </Container>
        <SvgRepeatingCircleBackground backgroundColor="background" />
      </Box>
      {/* Geo Stats --end */}

      {/* Tech Stats -- start */}
      <Box
        as="section"
        sx={{
          position: 'relative',
          pt: [5, 6],
          pb: 5,
        }}
      >
        <Container>
          <Grid
            sx={{
              gap: 5,
            }}
          >
            <Grid>
              <GroovyHeading
                as="h2"
                variant="heading.h2"
                color="background"
                strokeColor="primary"
                textAlign="center"
                justifyContent="center"
                text={['Right', 'on']}
              />
              <Text
                as="p"
                sx={{
                  color: 'background',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                Technology these days is off the hook,
                <br />
                here’s the faves.
              </Text>
            </Grid>
            <TechStats />
            <Text
              sx={{
                color: 'background',
                mx: 'auto',
                textAlign: 'center',
              }}
            >
              Technology statistics provided by{' '}
              <Link
                href="https://developers.google.com/analytics/devguides/reporting/core/v3"
                target="_blank"
                rel="noopener"
                sx={{ color: 'primary', fontWeight: 'bold' }}
              >
                Google Analytics Core Reporting API -- v3
              </Link>
            </Text>
          </Grid>
        </Container>
        <SvgRepeatingCircleBackground backgroundColor="black" opacity={0.25} />
      </Box>
      {/* Tech Stats  --end */}

      {/* Comments -- start */}
      <Box
        as="section"
        sx={{
          position: 'relative',
          pt: [5, 6],
          pb: 5,
        }}
      >
        <Container>
          <Grid
            sx={{
              gap: 5,
            }}
          >
            <Grid>
              <GroovyHeading
                as="h2"
                variant="heading.h2"
                color="primary"
                strokeColor="black1"
                textAlign="center"
                justifyContent="center"
                text={['Jive', 'talkin']}
              />
              <Text as="p" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                If you aint just woofin leave a comment,
                <br />
                but make it fab -- square biz?
              </Text>
            </Grid>
            <CommentForm />
            <Comments />
            <Text
              sx={{
                mx: 'auto',
                textAlign: 'center',
              }}
            >
              Data storage is provided by the funky folks at{' '}
              <Link
                href="https://fauna.com/"
                target="_blank"
                rel="noopener"
                sx={{ color: 'primary', fontWeight: 'bold' }}
              >
                Fauna
              </Link>
            </Text>
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
          pt: [5, 6],
          pb: 5,
        }}
      >
        <Container>
          <Grid
            sx={{
              gap: 5,
            }}
          >
            <Grid>
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
            </Grid>
            <Reactions />
            <Text
              sx={{
                color: 'background',
                mx: 'auto',
                textAlign: 'center',
              }}
            >
              Data storage is provided by the funky folks at{' '}
              <Link
                href="https://fauna.com/"
                target="_blank"
                rel="noopener"
                sx={{ color: 'primary', fontWeight: 'bold' }}
              >
                Fauna
              </Link>
            </Text>
          </Grid>
        </Container>
        <SvgRepeatingCircleBackground backgroundColor="black" opacity={0.25} />
      </Box>
      {/* Reactions --end */}

      {/* Newsletter -- start */}
      <Box
        as="section"
        sx={{
          position: 'relative',
          pt: [5, 6],
          pb: 5,
        }}
      >
        <Container>
          <Grid
            sx={{
              gap: 5,
            }}
          >
            <Grid>
              <GroovyHeading
                as="h2"
                variant="heading.h2"
                color="primary"
                strokeColor="black1"
                textAlign="center"
                justifyContent="center"
                text={['Psych']}
              />
              <Text as="p" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                Forms, are you trippin!
                <br />
                Queen{' '}
                <Link
                  href="https://twitter.com/raae"
                  target="_blank"
                  rel="noopener"
                  sx={{ color: 'primary', fontWeight: 'bold' }}
                >
                  @raae
                </Link>{' '}
                handles my Newsletter coz i’m out to lunch!
              </Text>
            </Grid>
            <NewsletterForm />
            <Text
              sx={{
                mx: 'auto',
                textAlign: 'center',
              }}
            >
              Newsletter / Mailing Lists are provided by the cool cats at{' '}
              <Link
                href="https://convertkit.com/"
                target="_blank"
                rel="noopener"
                sx={{ color: 'primary', fontWeight: 'bold' }}
              >
                ConvertKit
              </Link>{' '}
              -- w/e
            </Text>
          </Grid>
        </Container>
        <SvgRepeatingCircleBackground backgroundColor="background" />
      </Box>
      {/* Newsletter --end */}
    </Fragment>
  )
}

export default IndexPage
