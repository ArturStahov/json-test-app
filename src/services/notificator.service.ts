import { notificatorEmitEvents } from "@/events/notificator.events";
import { INotificatorEvent, typeNotificators } from "@/interfaces/notificator.interface";
import { emitter } from "./emitter";

export function showNotificatorToast(type: typeNotificators, msg: string) {
  const event: INotificatorEvent = {
    type,
    msg,
  }
  emitter.emit(notificatorEmitEvents.SHOW_TOAST, event);
}

export default { 
  showNotificatorToast,
};