import React, {
  ChangeEvent,
  Fragment,
  FunctionComponent,
  useState,
} from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import {
  Card,
  Grid,
  Box,
  Text,
  Textarea,
  Button,
  Link,
  Spinner,
} from 'theme-ui'

import GroovyHeading from '../components/groovy-heading'

const CommentForm: FunctionComponent = () => {
  const {
    isAuthenticated,
    user,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0()
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [response, setResponse] = useState({
    color: 'highlight',
    message: `⚠️ Comments are moderated and won't appear until I've approved them!`,
    hasError: false,
    isSuccess: false,
  })

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.GATSBY_AUTH0_AUDIENCE,
      })

      const response = await axios.post(
        '/api/add-comment',
        {
          user: user.name,
          comment: comment,
          date: new Date(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      setIsSubmitting(false)
      setResponse({
        color: 'success',
        message: response.data.message,
        hasError: false,
        isSuccess: true,
      })
    } catch (error) {
      setIsSubmitting(false)
      setResponse({
        color: 'error',
        message: error.data.message,
        hasError: true,
        isSuccess: false,
      })
    }
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value)
  }

  return (
    <Card>
      <Grid
        sx={{
          gap: 3,
          minHeight: 200,
        }}
      >
        {isLoading ? (
          <Grid sx={{ placeItems: 'center' }}>
            <Spinner />
          </Grid>
        ) : (
          <Fragment>
            {isAuthenticated ? (
              <Grid
                sx={{
                  alignItems: 'center',
                }}
              >
                <Grid
                  sx={{
                    gap: 1,
                  }}
                >
                  <GroovyHeading
                    as="h3"
                    variant="heading.h3"
                    color="success"
                    strokeColor="black1"
                    textAlign={['center', 'left']}
                    justifyContent={['center', 'flex-start']}
                    text={['Leave', 'a', 'comment']}
                  />
                  <Textarea
                    maxLength={140}
                    disabled={response.isSuccess}
                    value={comment}
                    onChange={handleChange}
                    sx={{
                      resize: 'none',
                      minHeight: '100px',
                      color: response.isSuccess ? 'grey5' : 'black',
                    }}
                  />
                </Grid>
                <Grid
                  sx={{
                    alignItems: 'center',
                    gridTemplateColumns: ['1fr', '1fr auto'],
                  }}
                >
                  <Text
                    variant="small"
                    sx={{
                      fontWeight: 'bold',
                      color: response.color,
                    }}
                  >
                    {response.message}
                  </Text>
                  <Button
                    disabled={
                      !comment.length || isSubmitting || response.isSuccess
                    }
                    onClick={handleSubmit}
                  >
                    Comment
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid
                sx={{
                  alignItems: 'center',
                }}
              >
                <Grid
                  sx={{
                    gap: 1,
                  }}
                >
                  <GroovyHeading
                    as="h3"
                    variant="heading.h3"
                    color="success"
                    strokeColor="black1"
                    textAlign="center"
                    justifyContent="center"
                    text={['Comment']}
                  />
                  <Text
                    as="p"
                    sx={{
                      color: 'black3',
                      textAlign: 'center',
                    }}
                  >
                    Authorization is provided by the slammin’ peeps at{' '}
                    <Link
                      href="https://auth0.com/"
                      target="_blank"
                      rel="noopener"
                    >
                      Auth0
                    </Link>
                    <br />
                    Login with Twitter to have your say.
                  </Text>
                </Grid>
                <Box
                  sx={{
                    mx: 'auto',
                  }}
                >
                  <Button onClick={loginWithRedirect}>
                    Login with Twitter
                  </Button>
                </Box>
              </Grid>
            )}
          </Fragment>
        )}
      </Grid>
    </Card>
  )
}

export default CommentForm
