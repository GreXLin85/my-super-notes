import { type Note } from "@prisma/client"
import { type InferGetServerSidePropsType, type GetServerSideProps } from "next"
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"
import { Loading } from "~/components/LoadingPage"
import Sidebar from "~/components/Sidebar"
import { Unauthorized } from "~/components/UnauthorizedPage"
import { authOptions } from "~/server/auth"
import { db } from "~/server/db"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps = (async (context: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
      return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const notes = await db.note.findMany({
      where: {
          authorId: session?.user.id
      }
  })

  const serializedNotes = notes.map(note => ({
    ...note,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString()
  }))
  

  return { props: { notes: serializedNotes } }
}) satisfies GetServerSideProps<{
  notes: Note[]
}>

export default function Dashboard({ notes }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Loading />
  }

  if (status === "unauthenticated") {
    return <Unauthorized />
  }

  return (
    <div className="w-screen h-screen flex flex-row">
      <Sidebar notes={notes}/>
    </div>
  )
}