import { EventType, ListenerType } from "./interfaces";

export default class EventEmitter {
  public events: EventType = {};

  constructor(eventNames: string[]) {
    this.initialize(eventNames);
  }

  public emit<T>(event: string, payload: T): void {
    this.preventInexistentEvent(event);

    this.events[event].map((listener) => listener(payload));
  }

  public on(event: string, listener: ListenerType): void {
    this.preventInexistentEvent(event);

    this.events[event].push(listener);
  }

  private eventExist(event: string): boolean {
    return !!this.events[event];
  }

  private preventInexistentEvent(event: string): void {
    if (this.eventExist(event)) {
      throw new Error("Event does't exist in events list.");
    }
  }

  private initialize(eventNames: string[]): void {
    eventNames.map((eventName) => (this.events[eventName] ??= []));
  }
}
