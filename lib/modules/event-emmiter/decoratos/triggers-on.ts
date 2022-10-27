import { EventName } from "../interfaces";

export function TriggersOn(event: EventName): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    Reflect.defineMetadata(event, propertyKey, target);

    return descriptor;
  };
}
