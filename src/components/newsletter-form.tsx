import React, {
  ChangeEvent,
  Fragment,
  FunctionComponent,
  SyntheticEvent,
  useState,
} from 'react'
import * as yup from 'yup'
import axios from 'axios'

import { Card, Grid, Box, Text, Input, Button, Link, Spinner } from 'theme-ui'

import GroovyHeading from '../components/groovy-heading'

const NewsletterForm: FunctionComponent = () => {
  const [inputValue, setInputValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [response, setResponse] = useState({
    color: 'black',
    message:
      "This is a signup to Queen Raae's Gatsby Newsletter. She'll let you know when I have something new to share!",
    hasError: false,
    isSuccess: false,
  })

  const schema = yup.object().shape({
    email: yup.string().required().email(),
  })

  const handleValidate = async (event: SyntheticEvent) => {
    event.preventDefault()
    try {
      const validate = await schema.validate({ email: inputValue })
      setResponse({
        color: 'highlight',
        message: 'Email is valid -- Submitting',
        hasError: false,
        isSuccess: true,
      })
      handleSubmit(validate.email)
    } catch (error) {
      setResponse({
        color: 'error',
        message: error.message,
        hasError: true,
        isSuccess: false,
      })
    }
  }

  const handleSubmit = async (email: string) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post('/api/signup-newsletter', {
        email: email,
      })
      setIsSubmitting(false)
      setInputValue('')
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <Card>
      <Grid
        sx={{
          gap: 3,
          minHeight: 200,
        }}
      >
        <Grid
          sx={{
            alignItems: 'center',
          }}
        >
          <Grid
            sx={{
              gap: 1,
              form: {
                display: 'grid',
                gap: 4,
              },
            }}
          >
            <GroovyHeading
              as="h3"
              variant="heading.h3"
              color="success"
              strokeColor="black1"
              textAlign={['center', 'left']}
              justifyContent={['center', 'flex-start']}
              text={['Newsletter']}
            />
            <form onSubmit={handleValidate} noValidate>
              <Input
                placeholder="boogy@the-disco.com"
                type="email"
                name="email"
                required={true}
                value={inputValue}
                onChange={handleChange}
                readOnly={isSubmitting}
              />

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
                  type="submit"
                  disabled={!inputValue.length || isSubmitting}
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default NewsletterForm
