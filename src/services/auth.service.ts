import { IAuthConfig, IValueAuthPayload, typesAction } from '../interfaces/auth.interface';
import { IUser } from '../interfaces/user.interface';
import axios from 'axios';
import { useUserStore } from '../stor/userStor';
import { codeFields } from '../constants/fields';
import { authActions } from '../constants/auth';


export const setToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const unsetToken = () => {
  axios.defaults.headers.common.Authorization = '';
}

export function getAuthConfig(action: typesAction): IAuthConfig {
  const flow = {
    [authActions.LOGIN]: loginConfig,
    [authActions.REGISTRATION]: registrationConfig
  }

  return flow[action](action);
}

function loginConfig(action: typesAction) {
  return {
    action,
    fields: [
      {
        code: codeFields.EMAIL,
        type: 'email',
        placeholder: 'email@gmail.com',
        label: 'email',
        required: true,
        errorMessage: 'E-mail must be valid',
        validStatus: true,
        value: '',
      },
      {
        code: codeFields.PASSWORD,
        type: 'password',
        placeholder: 'you uniq code',
        label: 'input you password',
        errorMessage: 'Password must be more than 8 characters',
        required: true,
        validStatus: true,
        value: '',
      }
    ],
    async submitEvent(payload: IValueAuthPayload) {
      await loginFlow(payload);
    }
  }
}

function registrationConfig(action: typesAction) {
  return {
    action,
    fields: [
      {
        code: codeFields.NAME,
        type: 'text',
        label: 'nickname',
        placeholder: 'input you nickname',
        required: false,
        value: '',
      },
      {
        code: codeFields.EMAIL,
        type: 'email',
        placeholder: 'email@gmail.com',
        label: 'email',
        required: true,
        errorMessage: 'E-mail must be valid',
        validStatus: true,
        value: '',
      },
      {
        code: codeFields.PASSWORD,
        type: 'password',
        label: 'input you password',
        placeholder: 'you uniq code',
        required: true,
        errorMessage: 'Password must be more than 8 characters',
        validStatus: true,
        value: '',
      },
      {
        code: codeFields.REPASSWORD,
        type: 'password',
        placeholder: 'repeat password',
        label: 'repeat you password',
        required: true,
        errorMessage: 'Different with password value!',
        validStatus: true,
        value: '',
      }


    ],
    async submitEvent(payload: IValueAuthPayload) {
      await registrationFlow(payload);
    }
  }
}

async function loginFlow(payload: IValueAuthPayload) {
  try {
    console.log('>>>>payload LOGIN', payload);
    const userStor = useUserStore();
    const data = await userStor.login(payload);
    const token = (data as IUser).token;
    setToken(token);
  } catch (error) {
    console.log('>>>>ERRR', error);
  }
}

async function registrationFlow(payload: IValueAuthPayload) {
  try {
    console.log('>>>>payload REG', payload);
    const userStor = useUserStore();
    const data = await userStor.registration(payload);
    console.log('DATA', data)
  } catch (error) {
    console.log('>>>>ERRR', error);
  }
}

export async function logoutAction() {
  try {
    const userStor = useUserStore();
    const data = await userStor.logout();
    console.log('DATA', data);
    unsetToken();
  } catch (error) {
    console.log('>>>>ERRR', error);
  }
}

export default {
  setToken,
  unsetToken,
  getAuthConfig,
  logoutAction,
}