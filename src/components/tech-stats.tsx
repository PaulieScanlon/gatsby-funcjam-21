import React, { FunctionComponent } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Grid, Text, Card } from 'theme-ui'

import GroovyHeading from './groovy-heading'
import { StatObject } from '../types'

const getCardPops = (name: string) => {
  const config = {
    browser: {
      strokeColor: 'primary',
      fillColor: 'tertiary',
    },
    os: {
      strokeColor: 'highlight',
      fillColor: 'success',
    },
    device: {
      strokeColor: 'tertiary',
      fillColor: 'secondary',
    },
  }

  return config[name]
}

const TechStats: FunctionComponent = () => {
  const { tech } = useStaticQuery(graphql`
    query {
      tech {
        browser {
          name
          count
        }
        os {
          name
          count
        }
        device {
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
      {Object.entries(tech).map(([stat, object], index: number) => {
        const { strokeColor, fillColor } = getCardPops(stat)
        const { name, count } = object as StatObject
        return (
          <Card
            key={index}
            sx={{
              backgroundColor: 'black1',
            }}
          >
            <Grid>
              <Grid
                sx={{
                  gap: 0,
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
                <Text sx={{ color: 'background', textAlign: 'center' }}>
                  {name}
                </Text>
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
                    color: 'background',
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

export default TechStats
