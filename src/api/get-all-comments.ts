import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import faunadb from 'faunadb'
import { format } from 'date-fns'

import { CommentResponse, CommentResult } from '../types'

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  if (req.method !== 'GET') {
    res.status(400).json({ message: 'req.method should be GET' })
  }

  const q = faunadb.query

  const client = new faunadb.Client({ secret: process.env.FAUNA_KEY })

  try {
    const response: CommentResponse = await client.query(
      q.Paginate(q.Match(q.Index(`all_comments_${process.env.NODE_ENV}`)))
    )

    const result = response.data
      .map(
        ([_, user, comment, date, approved]): CommentResult => ({
          ref: '', // this is kinda gross but it means we don't need to type the ref object
          user: user,
          comment: comment,
          date: format(new Date(date), 'd-MMM-u'),
          approved: Boolean(approved),
        })
      )
      .filter((comment) => comment.approved)

    res.status(200).json({ message: 'A ok!', comments: result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
