import { Listeners } from "./consts";
import { Action, PropertyKey } from "./types";
import { resolve } from "@impress/react";

export function action(): Action {
  return Object.defineProperty({}, Listeners, {
    value: [],
    enumerable: false,
    configurable: false
  });
}

export function listen(action: Action) {
  return (target: any, key: PropertyKey) => {
    action[Listeners].push([
      target.constructor, key
    ]);
  }
}

export function dispatch(action: Action, ...args: any[]) {
  for (const [Class, key] of action[Listeners]) {
    resolve(Class)?.[key]?.(...args);
  }
}
