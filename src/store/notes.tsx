import type { Note } from '@prisma/client'
import { create } from 'zustand'

interface isNotesState {
    notes: Note[]
    setNotes: (notes: Note[]) => void
    updateNoteTitleById: (id: string, title: string) => void
    updateNoteContentById: (id: string, content: string) => void
}

const useNotesStore = create<isNotesState>()((set) => ({
    notes: [],
    setNotes: (notes: Note[]) => set({ notes }),
    updateNoteTitleById: (id: string, title: string) => set((state) => {
        const notes = state.notes.map(note => {
            if (note.id === id) {
                return {
                    ...note,
                    title
                }
            }

            return note
        })

        return { notes }
    }),
    updateNoteContentById: (id: string, content: string) => set((state) => {
        const notes = state.notes.map(note => {
            if (note.id === id) {
                return {
                    ...note,
                    content
                }
            }

            return note
        })

        return { notes }
    })
}))

export default useNotesStore