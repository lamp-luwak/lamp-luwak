import { ClassType, StorePropertyKey, Container, Updater } from "./types";
import { Updaters, Keys, Values } from "./consts";
import { isReactComponent, invalidateReactComponent } from "~/driver";
import { remove } from "~/utils/array";

let notifyLocked = false;

export function store(target: object, propertyKey: StorePropertyKey, descriptor?: any): any {
  const initializer = descriptor?.initializer;
  if (typeof propertyKey !== "string") {
    throw new Error("Only string key supported for store property");
  }
  addKey(target, propertyKey);
  return {
    get() {
      return get(this, propertyKey, initializer);
    },
    set(value: any) {
      set(this, propertyKey, value);
    },
    configurable: false,
    enumerable: true,
  };
}

export function subscribe(target: any, updater: Updater) {
  const container = target as Container;
  const updaters = container[Updaters] = container[Updaters] || [];
  updaters.push(updater);
  return () => remove(updaters, updater);
}

export function isContainer(target: any) {
  return target && !!(target as Container)[Keys];
}


export function values(container: Container) {
  const values = {} as any;
  const stored = container[Values] || {};
  if (container[Keys]) {
    for (const key of container[Keys]!) {
      values[key] = stored.hasOwnProperty(key)
        ? stored[key]
        : container[key];
    }
  }
  return values;
}

export function make(Class: ClassType, data: object) {
  const inst = new Class();
  for (const key of inst[Keys] || []) {
    if (data.hasOwnProperty(key)) {
      (inst[Values] = inst[Values] || {})[key] = (data as any)[key];
    }
  }
  return inst;
}

export function quiet(code: () => any) {
  notifyLocked = true;
  try {
    code();
    notifyLocked = false;
  } catch(e) {
    notifyLocked = false;
    throw e;
  }
}

export function notify(container: Container) {
  if (notifyLocked) {
    return;
  }
  if (container[Updaters]) {
    const updaters = container[Updaters]!.slice();
    for (const updater of updaters) {
      updater();
    }
  }
  if (isReactComponent(container)) {
    invalidateReactComponent(container);
  }
}

function addKey(container: Container, key: string) {
  (container[Keys] = container[Keys] || []).push(key);
}

function get(container: Container, key: string, initializer?: () => any) {
  if (container[Values] && container[Values]!.hasOwnProperty(key)) {
    return container[Values]![key];
  }
  if (initializer) {
    return (container[Values] = container[Values] || {})[key] = initializer.call(container);
  }
}

function set(container: Container, key: string, value: any) {
  const values = container[Values] = container[Values] || {};
  if (values[key] !== value) {
    values[key] = value;
    notify(container);
  }
}
