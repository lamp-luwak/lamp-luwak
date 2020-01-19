import { Event, EventListener, PropertyKey } from "./types";
import state from "./state";

const { listeners } = state;

export function event(message?: string): Event {
	return { message };
}

export function listen(event: Event) {
  if (!listeners.has(event)) {
    listeners.set(event, new WeakMap());
  }
  return (target: object, _propertyKey: PropertyKey, descriptor: any) => {
    listeners.get(event)?.set(target, descriptor.value);
  }
}

export function dispatch(event: Event, data: any) {
  //
}

export function cleanup() {
  listeners.clear();
}

function addEventListener(event: Event, listener: EventListener) {

}
