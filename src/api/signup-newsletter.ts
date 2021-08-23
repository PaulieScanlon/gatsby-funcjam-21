import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import axios from 'axios'

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  if (req.method !== 'POST') {
    res.status(400).json({ message: 'req.method should be POST' })
  }
  const { email } = req.body

  if (!email) {
    res.status(400).json({ message: 'Email is required!' })
  } else {
    try {
      await axios.post(
        `https://api.convertkit.com/v3/forms/${process.env.CK_FORM_ID}/subscribe`,
        {
          email: email,
          api_key: process.env.CK_API_KEY,
        }
      )
      res.status(200).json({ message: "You're all signed up -- Right on!" })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message })
    }
  }
}
