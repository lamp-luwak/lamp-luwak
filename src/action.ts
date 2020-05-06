import { receive, send, blank } from "./chan";
import { prop } from "./prop";

const ActionChan = Symbol("ActionChan");
const propActionChan = prop(ActionChan, blank);

export function action() {
  return function handler(...args: any[]) {
    dispatch(handler, ...args);
  }
}

export function dispatch(target: any, ...args: any[]) {
  send(propActionChan(target), args);
}

export function on(target: any, callback: (...args: any[]) => void) {
  return receive(propActionChan(target), (args: any[]) => callback(...args));
}
