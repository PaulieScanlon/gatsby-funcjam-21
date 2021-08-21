import React, { FunctionComponent, useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Box, Flex, Card, Button } from 'theme-ui'
import { SvgIcon } from 'react-svg-bubble-slider'

import GroovyHeading from './groovy-heading'

import { ReactionSum } from '../types'

const getCardPops = (reaction: string) => {
  const config = {
    cool: {
      strokeColor: 'tertiary',
      fillColor: 'primary',
    },
    evil: {
      strokeColor: 'success',
      fillColor: 'highlight',
    },
    tongue: {
      strokeColor: 'secondary',
      fillColor: 'tertiary',
    },
  }

  return config[reaction]
}

const Reactions: FunctionComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reactions, setReactions] = useState<ReactionSum>()

  const handleSubmit = async (reaction: string) => {
    setIsSubmitting(true)
    try {
      await axios.post('/api/add-reaction', {
        reaction: reaction,
        date: new Date(),
      })
      setIsSubmitting(false)
    } catch (error) {
      setIsSubmitting(false)
      console.warn(error.message)
    }
  }

  const getAllReactions = async () => {
    try {
      const response = await axios('/api/get-all-reactions')
      setReactions(response.data.reactions)
    } catch (error) {
      console.warn(error.message)
    }
  }

  useEffect(() => {
    getAllReactions()
  }, [])

  useEffect(() => {
    getAllReactions()
  }, [isSubmitting])

  return (
    <Grid
      sx={{
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr 1fr'],
      }}
    >
      {reactions
        ? Object.entries(reactions).map(([reaction, object], index: number) => {
            const { strokeColor, fillColor } = getCardPops(reaction)
            const { count } = object

            return (
              <Card
                key={index}
                sx={{
                  backgroundColor: 'black1',
                  '.svg-icon': {
                    color: 'black1',
                    backgroundColor: fillColor,
                    borderStyle: 'solid',
                    borderWidth: '6px',
                    borderRadius: '50%',
                    borderColor: fillColor,
                    width: 80,
                    height: 'auto',
                    mx: 'auto',
                  },
                }}
              >
                <Grid
                  sx={{
                    gap: 4,
                    justifyContent: 'center',
                  }}
                >
                  <Grid
                    sx={{
                      gap: 4,
                      justifyContent: 'center',
                    }}
                  >
                    <GroovyHeading
                      as="h3"
                      variant="heading.h3"
                      color="black2"
                      justifyContent="center"
                      textAlign="center"
                      strokeColor={strokeColor}
                      text={[reaction]}
                    />
                    <Box
                      sx={{
                        position: 'relative',
                        mx: 'auto',
                      }}
                    >
                      <Flex
                        sx={{
                          position: 'absolute',
                          alignItems: 'center',
                          justifyContent: 'center',
                          top: '-12px',
                          right: '-12px',
                          width: 38,
                          height: 38,
                          fontSize: '0.65rem',
                          fontWeight: 'bold',
                          borderRadius: '50%',
                          color: 'background',
                          backgroundColor: fillColor,
                        }}
                      >
                        {`x${count}`}
                      </Flex>
                      <SvgIcon name={reaction} />
                    </Box>
                  </Grid>
                  <Box
                    sx={{
                      mx: 'auto',
                    }}
                  >
                    <Button
                      variant="secondary"
                      disabled={isSubmitting}
                      onClick={() => handleSubmit(reaction)}
                      sx={{
                        borderColor: strokeColor,
                        color: strokeColor,
                      }}
                    >
                      Submit Reaction
                    </Button>
                  </Box>
                </Grid>
              </Card>
            )
          })
        : null}
    </Grid>
  )
}

export default Reactions
