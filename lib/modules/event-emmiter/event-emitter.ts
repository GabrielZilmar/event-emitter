import "reflect-metadata";
import { EventName, EventType, ListenerType } from "./interfaces";

export default class EventEmitter {
  public events: EventType = {};

  constructor(eventNames: EventName[]) {
    this.initialize(eventNames);
  }

  public async emit<T>(event: EventName, payload: T): Promise<void> {
    this.preventInexistentEvent(event);

    await Promise.all(this.events[event].map((listener) => listener(payload)));
  }

  public on(event: EventName, listener: ListenerType): void {
    this.preventInexistentEvent(event);

    this.events[event].push(listener);
  }

  private eventExist(event: EventName): boolean {
    return !!this.events[event];
  }

  private preventInexistentEvent(event: EventName): void {
    if (!this.eventExist(event)) {
      throw new Error("Event does't exist in events list.");
    }
  }

  private initialize(eventNames: EventName[]): void {
    eventNames.map((eventName) => (this.events[eventName] ??= []));
  }
}
