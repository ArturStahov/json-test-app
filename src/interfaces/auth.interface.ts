import { authActions } from "@/constants/auth";
import { codeFields } from "@/constants/fields";

export interface IAuthPayload {
  action: typesAction,
  value: IValueAuthPayload,
}

export interface IValueAuthPayload {
  email: string,
  name?: string,
  password: string,
}

export interface ILoginPayload {
  email: string,
  password: string,
}

export interface IRegistrationPayload {
  name: string,
  email: string,
  password: string,
}

export interface IAuthConfig {
  action: typesAction,
  fields: IField[],
  submitEvent: (payload: IValueAuthPayload) => Promise<void>
}

export interface IField {
  code: typeCodeFields,
  type: string,
  label: string,
  placeholder: string,
  required: boolean,
  value: string,
  errorMessage?: string,
  validStatus?: boolean,
}

export interface IFormSubmitPayload { [key: string]: string }

export type typesAction = authActions.LOGIN | authActions.REGISTRATION

export type typeValidationItem = { code: typeCodeFields, status: boolean }

export type rulesType = (v: string, valuePassword?: string) => boolean;

export type typeCodeFields = codeFields.EMAIL
  | codeFields.NAME
  | codeFields.PASSWORD
  | codeFields.REPASSWORD