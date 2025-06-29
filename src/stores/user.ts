// stores/counter.js
import { defineStore } from 'pinia'
import type { User } from './user.types'

export const useAuthStore = defineStore('', {
  state: () => ({
    user: null as User | null,
  }),
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setUser(user: User | null) {
      this.user = user
    },
  },
})
