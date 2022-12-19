import { IUser } from '../../interfaces/user.interface';
import { ILoginPayload, IRegistrationPayload } from '../../interfaces/auth.interface';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';

const routes = {
  login: '/api/users/login',
  registration: '/api/users/registration',
  logout: '/api/users/logout',
}

export const login = (payload: ILoginPayload): Promise<IUser> => {
  return axios.post(routes.login, payload)
    .then((response) => response.data.data)
    .catch(errorHandler);
};

export const registration = (payload: IRegistrationPayload): Promise<any> => {
  return axios.post(routes.registration, payload)
    .then((response) => response.data.data)
    .catch(errorHandler);
};

export const logOut = (): Promise<any> => {
  return axios.post(routes.logout)
    .then((response) => response.data.data)
    .catch(errorHandler);
};

function errorHandler(error: Error) {
  throw new Error(error.message);
}