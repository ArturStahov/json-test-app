import { defineStore } from 'pinia';
import * as userHttp from '../services/api/auth-http';
import { IRegistrationPayload, IValueAuthPayload } from '../interfaces/auth.interface';
import { IUser } from '../interfaces/user.interface';

export const useUserStore = defineStore('user', {
  state: (): { user: any } => ({
    user: null,
  }),

  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    async login(payload: IValueAuthPayload): Promise<IUser | Error> {
      try {
        const data = await userHttp.login(payload);
        this.user = { ...data };
        return data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    async registration(payload: IValueAuthPayload): Promise<IUser | Error> {
      try {
        const data = await userHttp.registration(payload as IRegistrationPayload);
        return data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    async logout(): Promise<any | Error> {
      try {
        const data = await userHttp.logOut();
        return data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
})
