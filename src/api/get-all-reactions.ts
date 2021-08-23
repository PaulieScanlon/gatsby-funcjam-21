import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import faunadb from 'faunadb'
import { format } from 'date-fns'

import { ReactionResponse, ReactionResult, ReactionSum } from '../types'

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
    const response: ReactionResponse = await client.query(
      q.Paginate(q.Match(q.Index(`all_reactions_${process.env.NODE_ENV}`)))
    )

    const result = response.data
      .map(
        ([_, reaction, date]): ReactionResult => ({
          ref: '',
          reaction: reaction,
          date: format(new Date(date), 'd-MMM-u'),
        })
      )
      .reduce((items, item): ReactionSum => {
        const { reaction } = item
        items[reaction] = items[reaction] || { count: 0 }

        if (items[reaction]) {
          items[reaction].count++
        }

        return items
      }, {})

    res.status(200).json({ message: 'A ok!', reactions: result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
