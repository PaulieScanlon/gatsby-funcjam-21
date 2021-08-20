import React, { FunctionComponent, useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Heading, Grid } from 'theme-ui'

const CommentsPage: FunctionComponent = () => {
  const [comments, setComments] = useState('Loading...')

  const getAllComments = async () => {
    console.log('getAllComments')
    try {
      const response = await axios('/api/get-all-comments')

      setComments(response.data.comments)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllComments()
    const pollInterval = setInterval(() => {
      getAllComments()
    }, 60000)

    return () => clearInterval(pollInterval)
  }, [])

  return (
    <Container>
      <Grid
        sx={{
          py: 5,
        }}
      >
        <Heading as="h1" variant="heading.h1">
          Comments
        </Heading>
        <pre>{JSON.stringify(comments, null, 2)}</pre>
      </Grid>
    </Container>
  )
}

export default CommentsPage
