export type eventListenersType = {
  element: HTMLElement;
  event: (e: Event) => void;
  eventName: string;
};

export type selectTypes = "Correct" | "Incorrect";
