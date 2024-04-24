import { eventListenersType } from "../bc/types/domTypes";

export function getElement<T extends HTMLElement>(
  query: string,
  fatherElement?: HTMLElement
): T {
  if (fatherElement) {
    return fatherElement.querySelector(query) as T;
  }
  return document.querySelector(query) as T;
}

export function setEventListener(listeners: eventListenersType[]) {
  listeners.forEach(({ element, event, eventName }) => {
    element.addEventListener(eventName, event);
  });
}
