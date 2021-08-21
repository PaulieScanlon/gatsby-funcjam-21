import React, { FunctionComponent } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Grid, Text, Card } from 'theme-ui'

import GroovyHeading from './groovy-heading'
import { StatObject } from '../types'

const getCardPops = (name: string) => {
  const config = {
    city: {
      strokeColor: 'tertiary',
      fillColor: 'primary',
    },
    country: {
      strokeColor: 'success',
      fillColor: 'highlight',
    },
    continent: {
      strokeColor: 'secondary',
      fillColor: 'tertiary',
    },
  }

  return config[name]
}

const GeoStats: FunctionComponent = () => {
  const { geo } = useStaticQuery(graphql`
    query {
      geo {
        city {
          name
          count
        }
        country {
          name
          count
        }
        continent {
          name
          count
        }
      }
    }
  `)

  return (
    <Grid
      sx={{
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr 1fr'],
      }}
    >
      {Object.entries(geo).map(([stat, object], index: number) => {
        const { strokeColor, fillColor } = getCardPops(stat)
        const { name, count } = object as StatObject
        return (
          <Card key={index}>
            <Grid>
              <Grid
                sx={{
                  gap: 0,
                  placeItems: 'center',
                }}
              >
                <GroovyHeading
                  as="h3"
                  variant="heading.h3"
                  color="black2"
                  justifyContent="center"
                  textAlign="center"
                  strokeColor={strokeColor}
                  text={[stat]}
                />
                <Text sx={{ textAlign: 'center' }}>{name}</Text>
              </Grid>
              <Grid
                sx={{
                  gap: 0,
                }}
              >
                <Text
                  sx={{
                    textAlign: 'center',
                    fontFamily: 'alt',
                    fontSize: 6,
                    color: fillColor,
                    lineHeight: 'alt',
                  }}
                >
                  {count}
                </Text>
                <Text
                  variant="small"
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  Visits
                </Text>
              </Grid>
            </Grid>
          </Card>
        )
      })}
    </Grid>
  )
}

export default GeoStats
