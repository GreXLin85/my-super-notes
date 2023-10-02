import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '~/server/auth'
import { db } from '~/server/db'

type ResponseData = {
  message: string
  data?: unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  switch (req.method) {
    case 'POST':
      const note = await db.note.create({
        data: {
          title: "",
          content: "",
          authorId: session?.user.id
        }
      })

      return res.status(200).json({ message: 'Data successfully submitted', data: note })
    default:
      return res.status(405).json({ message: 'Method Not Allowed' })
  }
}