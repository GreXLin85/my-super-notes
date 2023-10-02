import { create } from 'zustand'

interface isCurrentNoteState {
    id: string | undefined
    setCurrentNote: (id: string) => void
}

const useCurrentNoteStore = create<isCurrentNoteState>()((set) => ({
    id: undefined,
    setCurrentNote: (id: string) => set(() => ({ id })),
}))

export default useCurrentNoteStore