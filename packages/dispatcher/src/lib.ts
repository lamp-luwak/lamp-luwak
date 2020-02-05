import { Listeners, Locked } from "./consts";
import { Action, PropertyKey } from "./types";
import { resolve } from "@impress/react";

export function action(): Action {
  return {
    [Listeners]: []
  };
}

export function listen(action: Action) {
  return (target: any, key: PropertyKey) => {
    action[Listeners].push([
      target.constructor, key
    ]);
  }
}

export function dispatch(action: Action, ...args: any[]) {
  if (action[Locked]) {
    return;
  }
  for (const [Class, key] of action[Listeners]) {
    resolve(Class)?.[key]?.(...args);
  }
}

export function lock(action: Action) {
  action[Locked] = true;
}

export function unlock(action: Action) {
  action[Locked] = false;
}
