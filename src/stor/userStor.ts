import { defineStore } from 'pinia';


export const useUserStore = defineStore('user', {
  state: (): { user: any } => ({
    user: null,
  }),

  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    async login(payload: any): Promise<any | Error> {
      try {
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    async registration(payload: any): Promise<any | Error> {
      try {
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    async logout(): Promise<any | Error> {
      try {
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
})
