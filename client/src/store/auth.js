import { create } from 'zustand'

// const useUserStore = create((set) => ({
//   user: null,
//   setUser: (user) => set({ user }),
// }))

const useUserStore = create((set) => ({
  user: {
    id: 1,
  },
  setUser: (user) => set({
    id: 1,
  }),
}))

export default useUserStore;