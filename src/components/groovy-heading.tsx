import React, { Fragment, FunctionComponent } from 'react'
import { Heading, Box, ThemeUIStyleObject } from 'theme-ui'

type TextAlign = 'left' | 'right' | 'center'
type justifyContent = 'flex-start' | 'flex-end' | 'center'

interface IGroovyHeadingProps {
  /** Text to display */
  text: string[]
  /** HTML heading element */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'
  /** Theme UI heading variant */
  variant?: string
  /** CSS color */
  color?: string
  /** CSS -webkit-text-stroke-color */
  strokeColor?: string
  /** CSS text-align */
  textAlign?: TextAlign | TextAlign[]
  /** CSS justify-content */
  justifyContent?: justifyContent | justifyContent[]
  /** Theme UI sx prop */
  sx?: ThemeUIStyleObject
}

const GroovyHeading: FunctionComponent<IGroovyHeadingProps> = ({
  text,
  as = 'h2',
  variant = 'heading.h2',
  color = 'secondary',
  strokeColor = 'primary',
  textAlign = 'left',
  justifyContent = 'flex-start',
  sx,
}) => {
  return (
    <Heading
      as={as}
      variant={variant}
      sx={{
        display: 'grid',
        gap: [0, 2],
        placeItems: 'center',
        gridTemplateColumns: [
          `repeat(${text.length}, 1f)`,
          `repeat(${text.length}, 1f)`,
          `repeat(${text.length}, auto)`,
        ],
        justifyContent: justifyContent,
        ...sx,
      }}
    >
      <Fragment>
        {text.map((string, index) => {
          return (
            <Box
              key={index}
              as="span"
              data-text={string}
              sx={{
                display: 'inline-grid',
                placeItems: 'center',
                gridTemplateAreas: '"text"',
                textAlign: textAlign,
                textTransform: 'capitalize',
                '::before': {
                  content: 'attr(data-text)',
                  gridArea: 'text',
                  background: (theme) =>
                    `no-repeat linear-gradient(${theme.colors[strokeColor]}, ${theme.colors[strokeColor]}) 50% 50%/80% 25%`,
                  WebkitTextStrokeColor: (theme) => theme.colors[strokeColor],
                },
                color: color,
              }}
            >
              <Box
                as="span"
                sx={{
                  textAlign: textAlign,
                  gridArea: 'text',
                  textTransform: 'capitalize',
                }}
              >
                {string}
              </Box>
            </Box>
          )
        })}
      </Fragment>
    </Heading>
  )
}

export default GroovyHeading
