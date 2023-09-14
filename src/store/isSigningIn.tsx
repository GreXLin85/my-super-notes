import { create } from 'zustand'

interface isSigningInState {
    isSigningIn: boolean
    toggle: () => void
}

const useIsSigningInStore = create<isSigningInState>()((set) => ({
    isSigningIn: false,
    toggle: () => set((state) => ({ isSigningIn: !state.isSigningIn })),
}))

export default useIsSigningInStore