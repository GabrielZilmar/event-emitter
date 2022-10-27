export type EventType = {
  [key: string]: ListenerType[];
};

export type ListenerType = <T>(payload: T) => void;
