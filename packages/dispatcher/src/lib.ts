import { Listeners, Locked } from "./consts";
import { Action, PropertyKey, ActionListener, ListenerRemover } from "./types";
import { resolve, resolved } from "@impress/react";

export function action(): Action {
  return {
    [Listeners]: []
  };
}

export function on(action: Action, listener?: ActionListener): any {
  if (typeof listener !== "undefined") {
    return add(action, listener);
  }
  function fn(listener: ActionListener): ListenerRemover;
  function fn(target: any, key: PropertyKey): void;
  function fn(targetOrListener: any, key?: PropertyKey) {
    if (typeof key === "undefined") {
      return add(action, targetOrListener);
    }
    add(action, [ targetOrListener.constructor, key ]);
  }
  return fn;
}

export function once(action: Action, listener?: ActionListener): any {
  if (typeof listener !== "undefined") {
    return add(action, onceDecorator(action, listener));
  }
  function fn(listener: ActionListener): ListenerRemover;
  function fn(target: any, key: PropertyKey): void;
  function fn(targetOrListener: any, key?: PropertyKey) {
    if (typeof key === "undefined") {
      return add(action, onceDecorator(action, targetOrListener));
    }
    add(action, onceDecorator(action, [ targetOrListener.constructor, key ]));
  }
  return fn;
}

export function dispatch(action: Action, ...values: any[]) {
  if (action[Locked]) {
    return;
  }
  const listeners = action[Listeners].slice();
  for (const listener of listeners) {
    call(listener, values);
  }
}

export function lock(action: Action) {
  action[Locked] = true;
}

export function unlock(action: Action) {
  action[Locked] = false;
}

function add(action: Action, listener: ActionListener): ListenerRemover {
  action[Listeners].push(listener);
  return () => off(action, listener);
}

function off(action: Action, listener: ActionListener) {
  let index = 0;
  const listeners = action[Listeners];
  while (index < listeners.length) {
    if (listeners[index] === listener) {
      listeners.splice(index, 1);
    } else {
      index++;
    }
  }
}

function call(listener: ActionListener, values: any) {
  if (typeof listener === "function") {
    listener(...values);
  } else {
    const [Class, key] = listener;
    if (resolved(Class)) {
      resolve(Class)[key](...values);
    }
  }
}

function onceDecorator(action: Action, listener: ActionListener): ActionListener {
  return function onceListener(...values: any[]) {
    try {
      call(listener, values);
      off(action, onceListener);
    } catch (e) {
      off(action, onceListener);
      throw e;
    }
  }
}

