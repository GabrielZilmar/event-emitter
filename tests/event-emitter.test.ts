import "reflect-metadata";
import { describe, expect, it } from "@jest/globals";
import { EventEmitter } from "../lib/modules/event-emitter";
import { TriggersOn } from "../lib/modules/event-emitter/decorators/triggers-on";

describe("Event Emitter", () => {
  const eventNames = ["event1", "event2"];

  const createEventEmitter = (events?: string[]) => {
    const eventEmitter = new EventEmitter(events?.length ? events : eventNames);
    return eventEmitter;
  };

  it("Should init a event-emitter class", () => {
    const eventEmitter = createEventEmitter();

    expect(eventEmitter).toBeInstanceOf(EventEmitter);
    expect(eventEmitter.events[eventNames[0]]).toEqual([]);
  });

  it("Should trigger on an event", async () => {
    const eventEmitter = createEventEmitter();
    const eventName = eventNames[0];

    jest.spyOn(EventEmitter.prototype, "on");
    expect(EventEmitter.prototype.on).toBeCalledTimes(0);

    class TestClass {
      @TriggersOn(eventName, eventEmitter)
      triggersOnTest() {}
    }
    new TestClass();

    expect(EventEmitter.prototype.on).toBeCalledTimes(1);
  });

  it("Should emit an event", async () => {
    const eventEmitter = createEventEmitter();
    const eventName = eventNames[0];

    jest.spyOn(EventEmitter.prototype, "on");
    expect(eventEmitter.events[eventName].length).toBe(0);

    class TestClass {
      @TriggersOn(eventName, eventEmitter)
      triggersOnTest() {}
    }
    new TestClass();

    await eventEmitter.emit(eventName, { payload: "payload" });
    expect(eventEmitter.events[eventName].length).toBe(1);
  });

  it("Should not emit an inexistent event", async () => {
    const eventEmitter = createEventEmitter();
    const eventName = "wrong-event-name";

    expect(() => {
      class TestClass {
        @TriggersOn(eventName, eventEmitter)
        triggersOnTest() {}
      }
    }).toThrow();
  });
});
