import React, { FunctionComponent, useState, useEffect } from 'react'
import axios from 'axios'
import { Grid, Card, Text } from 'theme-ui'

import { CommentResult } from '../types'

const Comments: FunctionComponent = () => {
  const [comments, setComments] = useState<CommentResult[]>()

  const getAllComments = async () => {
    try {
      const response = await axios('/api/get-all-comments')

      setComments(response.data.comments)
    } catch (error) {
      console.warn(error.message)
    }
  }

  useEffect(() => {
    getAllComments()
  }, [])

  return (
    <Grid
      sx={{
        gridTemplateColumns: ['1fr', '1fr 1fr'],
      }}
    >
      {comments
        ? comments.map((item, index) => {
            const { user, date, comment } = item

            return (
              <Card key={index}>
                <Grid>
                  <Text as="div" variant="small" sx={{ color: 'primary' }}>
                    {date}
                  </Text>

                  <Text
                    as="div"
                    sx={{ fontSize: 2, fontStyle: 'italic', color: 'black3' }}
                  >
                    {`"${comment}"`}
                  </Text>
                  <Text
                    as="div"
                    variant="small"
                    sx={{
                      textAlign: 'right',
                    }}
                  >
                    {user}
                  </Text>
                </Grid>
              </Card>
            )
          })
        : null}
    </Grid>
  )
}

export default Comments
