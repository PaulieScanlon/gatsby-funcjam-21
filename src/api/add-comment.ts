import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import faunadb from 'faunadb'
import jwt from 'express-jwt'
import jwks from 'jwks-rsa'

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.GATSBY_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.GATSBY_AUTH0_AUDIENCE,
  issuer: `https://${process.env.GATSBY_AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
})

const runJwtCheck = async (req, res) => {
  await new Promise((resolve, reject) => {
    jwtCheck(req, res, (result) => {
      if (result instanceof Error) {
        reject(result)
      }
      resolve(result)
    })
  })
}

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { user, comment, date } = req.body

  const q = faunadb.query

  const client = new faunadb.Client({ secret: process.env.FAUNA_KEY })

  try {
    await runJwtCheck(req, res)

    await client.query(
      q.Create(q.Collection(`comments_${process.env.NODE_ENV}`), {
        data: { user: user, comment: comment, date: date, approved: false },
      })
    )

    res.status(200).json({ message: 'Yeah baby! Love the message, ya dig!' })
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.inner?.message || error.message,
    })
  }
}
