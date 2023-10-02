import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '~/server/auth'
import { db } from '~/server/db'
import { z } from "zod";

type ResponseData = {
  message: string
  data?: unknown
}

const UpdateNote = z.object({
  content: z.object({
    contentHTML: z.string().min(1),
    contentText: z.string().min(1),
  }).required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const session = await getServerSession(req, res, authOptions)
  

  switch (req.method) {
    case 'PUT':
      const valid = UpdateNote.safeParse(req.body)

      if (!valid.success) {
        return res.status(200).json({ message: valid.error.errors[0].message })
      }

      const note = await db.note.update({
        where: {
          id: req.query.id as string
        },
        data: {
          title: valid.data.content.contentText.split("\n")[0]?.substring(0, 80),
          content: valid.data.content.contentHTML
        }
      })
      

      return res.status(200).json({ message: 'Data successfully updated', data: note })
    default:
      return res.status(405).end() //Method Not Allowed
  }
}