import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import faunadb from 'faunadb'

type Data = string[]

interface Response {
  data: Data[]
}

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const q = faunadb.query

  const client = new faunadb.Client({ secret: process.env.FAUNA_KEY })

  try {
    const response: Response = await client.query(
      q.Paginate(q.Match(q.Index(`all_comments_${process.env.NODE_ENV}`)))
    )

    const result = response.data
      .map(([_, user, comment, date, approved]) => ({
        ref: '', // this is kinda gross but it means we don't need to type the ref object
        user: user,
        comment: comment,
        date: date,
        approved: approved,
      }))
      .filter((comment) => comment.approved)

    res.status(200).json({ message: 'A ok!', comments: result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
