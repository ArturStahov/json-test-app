import { IAuthConfig, IField, IValueAuthPayload, typesAction, rulesType, typeValidationItem, IFormSubmitPayload, ILoginErrorEvent } from '../interfaces/auth.interface';
import { IUser } from '../interfaces/user.interface';
import axios from 'axios';
import { useUserStore } from '../stor/userStor';
import { codeFields } from '../constants/fields';
import { authActions, authEmitEvents } from '../constants/auth';
import { emitter } from './emitter';

const PASSWORD_RULES = [(v: string) => !!v, (v: string) => v && v.length > 8];
const EMAIL_RULES = [(v: string) => !!v, (v: string) => /.+@.+\..+/.test(v)];
const RE_PASSWORD_RULES = [(v: string) => !!v, (v: string, valuePassword: string) => v === valuePassword];

const setToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

const unsetToken = () => {
  axios.defaults.headers.common.Authorization = '';
}

async function loginFlow(payload: IValueAuthPayload) {
  try {
    const userStor = useUserStore();
    const data = await userStor.login(payload);
    const token = (data as IUser).token;
    setToken(token);
    emitter.emit(authEmitEvents.LOGIN_SUCCESS);
  } catch (error: any) {
    const errorEvent: ILoginErrorEvent = {
      type: authActions.LOGIN,
      message: error.message  // add functional get error message for code or in backend error add
    }
    emitter.emit(authEmitEvents.LOGIN_ERROR, errorEvent);
  }
}

async function registrationFlow(payload: IValueAuthPayload) {
  try {
    const submitPayload = excludeParam(codeFields.REPASSWORD, payload)
    const userStor = useUserStore();
    const data = await userStor.registration(submitPayload);
    console.log('registration DATA', data)
    emitter.emit(authEmitEvents.REGISTRATION_SUCCESS);
  } catch (error: any) {
    const errorEvent: ILoginErrorEvent = { 
       type: authActions.REGISTRATION ,
       message: error.message 
    }
    emitter.emit(authEmitEvents.LOGIN_ERROR, errorEvent);
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

export function validateForm(inputFields: IField[], submitPayload: IFormSubmitPayload) {
  let validationItems: [] | typeValidationItem[] = [];
  const valuePassword = submitPayload[codeFields.PASSWORD];

  inputFields.forEach((fieldConfig: IField) => {
    const fieldValue = submitPayload[fieldConfig.code];
    if (fieldConfig.required) {
      const validationRules = getRules(fieldConfig);
      const resultChecked = validationRules
        .map((rule: rulesType) => rule(fieldValue, valuePassword))
        .filter((status: boolean) => status === false);
      const validationStatus = !resultChecked.length;
      validationItems = [...validationItems, { code: fieldConfig.code, status: validationStatus }];
    }
  });
  return validationItems;
}

export function getRules(field: IField) {
  const defaultRule = [() => true];
  const rules = {
    [`${codeFields.EMAIL}`]: EMAIL_RULES,
    [`${codeFields.PASSWORD}`]: PASSWORD_RULES,
    [`${codeFields.REPASSWORD}`]: RE_PASSWORD_RULES,
  };
  return (rules[field.code] ? rules[field.code] : defaultRule) as rulesType[];
}

export function getAuthConfig(action: typesAction): IAuthConfig {
  const flow = {
    [authActions.LOGIN]: loginConfig,
    [authActions.REGISTRATION]: registrationConfig
  }

  if (!flow[action](action)) {
    throw new Error(`not valid action: ${action}!`)
  }

  return flow[action](action);
}

function excludeParam(keyExclude: string, obj: any) {
  const { [keyExclude]: omitted, ...rest } = obj;
  return rest;
}

function loginConfig(action: typesAction) {
  return {
    action,
    fields: [
      {
        code: codeFields.EMAIL,
        type: 'email',
        placeholder: 'email@gmail.com',
        label: 'email*',
        required: true,
        errorMessage: 'E-mail must be valid',
        validStatus: true,
        value: '',
      },
      {
        code: codeFields.PASSWORD,
        type: 'password',
        placeholder: 'input you password',
        label: 'password*',
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
        label: 'email*',
        required: true,
        errorMessage: 'E-mail must be valid',
        validStatus: true,
        value: '',
      },
      {
        code: codeFields.PASSWORD,
        type: 'password',
        label: 'password*',
        placeholder: 'input you password',
        required: true,
        errorMessage: 'Password must be more than 8 characters',
        validStatus: true,
        value: '',
      },
      {
        code: codeFields.REPASSWORD,
        type: 'password',
        placeholder: 'repeat password',
        label: 'repeat you password*',
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

export default {
  validateForm,
  getAuthConfig,
  logoutAction,
}