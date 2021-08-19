import React, {
  ChangeEvent,
  Fragment,
  FunctionComponent,
  useState,
} from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { Card, Grid, Box, Text, Textarea, Button, Link } from 'theme-ui'

import GroovyHeading from '../components/groovy-heading'

const CommentForm: FunctionComponent = () => {
  const { isAuthenticated, user, isLoading, loginWithRedirect } = useAuth0()
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [responseMessage, setResponseMessage] = useState()

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await axios.post('/api/add-comment', {
        user: user.name,
        comment: comment,
        data: new Date(),
      })
      setComment('')
      setIsSubmitting(false)
      setResponseMessage(response.data.message)
    } catch (error) {
      setIsSubmitting(false)
      setResponseMessage(error.data.message)
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
        }}
      >
        {!isLoading ? (
          <Fragment>
            <GroovyHeading
              as="h5"
              variant="heading.h5"
              color="success"
              strokeColor="black1"
              textAlign={isAuthenticated ? 'left' : 'center'}
              justifyContent={isAuthenticated ? 'flex-start' : 'center'}
              text={isAuthenticated ? ['Comment'] : ['Leave', 'a', 'comment']}
            />

            {isAuthenticated ? (
              <Fragment>
                <Textarea
                  maxLength={140}
                  value={comment}
                  onChange={handleChange}
                  sx={{
                    resize: 'none',
                    minHeight: '100px',
                  }}
                />
                <Grid
                  sx={{
                    alignItems: 'center',
                    gridTemplateColumns: '1fr auto',
                  }}
                >
                  <Text
                    variant="small"
                    sx={{
                      color: 'black',
                    }}
                  >
                    {!responseMessage
                      ? `Your name: ${user.name} will be displayed with the comment.`
                      : responseMessage}
                  </Text>
                  <Button
                    disabled={!comment.length || isSubmitting}
                    onClick={handleSubmit}
                  >
                    Comment
                  </Button>
                </Grid>
              </Fragment>
            ) : (
              <Fragment>
                <Text
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
                  ,<br />
                  login with Twitter to have your say.
                </Text>
                <Box
                  sx={{
                    mx: 'auto',
                  }}
                >
                  <Button onClick={() => loginWithRedirect()}>
                    Login with Twitter
                  </Button>
                </Box>
              </Fragment>
            )}
          </Fragment>
        ) : null}
      </Grid>
    </Card>
  )
}

export default CommentForm
