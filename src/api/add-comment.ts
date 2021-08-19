import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import faunadb from 'faunadb'

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { user, comment, date } = req.body

  const q = faunadb.query

  const client = new faunadb.Client({ secret: process.env.FAUNA_KEY })

  try {
    await client.query(
      q.Create(q.Collection(`comments_${process.env.NODE_ENV}`), {
        data: { user: user, comment: comment, date: date, approved: false },
      })
    )

    setTimeout(() => {
      res.status(200).json({ message: 'Yeah baby! Love the message, ya dig!' })
    }, 500)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
