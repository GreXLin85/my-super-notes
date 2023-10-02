import { useSession } from "next-auth/react"
import { Loading } from "~/components/LoadingPage"
import Sidebar from "~/components/Sidebar"
import { Unauthorized } from "~/components/UnauthorizedPage"
import { useRouter } from 'next/router';
import NoteEditor from "~/components/NoteEditor";
import { NotFound } from "~/components/NotFoundPage";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth/next";
import { db } from "~/server/db";
import type { Note } from "@prisma/client";
import useCurrentNoteStore from "~/store/currentNote";
import { useEffect } from "react";

export default function Note({ notes, note }: { notes: Note[], note: Note }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { setCurrentNote } = useCurrentNoteStore()

  useEffect(() => {
    setCurrentNote?.(note.id)
  }, [note])

  const { id } = router.query
  

  if (id === undefined) {
    return <NotFound />
  }

  if (status === "loading") {
    return <Loading />
  }

  if (status === "unauthenticated") {
    return <Unauthorized />
  }

  return (
    <div className="w-screen h-screen flex flex-row flex-grow">
      <Sidebar notes={notes} />
      <NoteEditor content={note.content} />
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps(context: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const userId = session?.user.id
  const noteId = context.params.id

  const notes = await db.note.findMany({
    where: {
      authorId: userId
    }
  })

  const serializedNotes = notes.map(note => ({
    ...note,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString()
  }))

  const note = notes.find(note => note.id === noteId)

  return {
    props: {
      notes: serializedNotes,
      note: {
        ...note,
        createdAt: note?.createdAt.toISOString(),
        updatedAt: note?.updatedAt.toISOString()
      }
    }
  }
}