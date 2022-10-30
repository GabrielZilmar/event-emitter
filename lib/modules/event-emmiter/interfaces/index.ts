export type EventType = {
  [key: EventName]: ListenerType[];
};

export type EventName = string;

export type ListenerType = <T>(payload: T) => void;
