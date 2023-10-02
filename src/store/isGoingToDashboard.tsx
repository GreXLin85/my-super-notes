import { create } from 'zustand'

interface isGoingToDashboardState {
    isGoingToDashboard: boolean
    toggle: () => void
}

const useIsGoingToDashboardStore = create<isGoingToDashboardState>()((set) => ({
    isGoingToDashboard: false,
    toggle: () => set((state) => ({ isGoingToDashboard: !state.isGoingToDashboard })),
}))

export default useIsGoingToDashboardStore