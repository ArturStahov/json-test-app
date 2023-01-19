import { notificatorEnumTypes } from "@/constants/notificator";

export interface INotificatorEvent {
  msg: string;
  type: typeNotificators;
}

export type typeNotificators = notificatorEnumTypes.ERROR
| notificatorEnumTypes.SUCCESS
| notificatorEnumTypes.INFO;
