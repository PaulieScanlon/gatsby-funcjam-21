import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import faunadb from 'faunadb'

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { reaction, date } = req.body

  if (!reaction || !date) {
    res.status(400).json({ message: 'Reaction and Date are required!' })
  } else {
    const q = faunadb.query
    const client = new faunadb.Client({ secret: process.env.FAUNA_KEY })
    try {
      await client.query(
        q.Create(q.Collection(`reactions_${process.env.NODE_ENV}`), {
          data: { reaction: reaction, date: date },
        })
      )
      res.status(200).json({ message: 'Yeah baby! Reaction submitted ok!' })
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.inner?.message || error.message,
      })
    }
  }
}
