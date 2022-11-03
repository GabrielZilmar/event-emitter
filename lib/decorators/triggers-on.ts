import EventEmitter from "../event-emitter";
import { EventName, ListenerType } from "../interfaces";

export function TriggersOn(
  event: EventName,
  eventEmitter: EventEmitter
): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    Reflect.defineMetadata(event, propertyKey, target);

    if (descriptor.value) {
      eventEmitter.on(event, descriptor.value as ListenerType);
    }

    return descriptor;
  };
}
