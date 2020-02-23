import { ClassType, StorePropertyKey, Container, Updater } from "./types";
import { Updaters, Keys, Values } from "./consts";
import { isReactComponent, invalidateReactComponent } from "~/driver";
import { remove } from "~/utils/array";

let notifyLocked = false;

export function store(containerPrototype: Container, propertyKey: StorePropertyKey, descriptor?: any): any {
  const initializer = descriptor?.initializer;
  if (typeof propertyKey !== "string") {
    throw new Error("Only string key supported for store property");
  }
  (containerPrototype[Keys] = containerPrototype[Keys] || []).push(propertyKey);
  return {
    get(this: Container) {
      if (this[Values] && this[Values]!.hasOwnProperty(propertyKey)) {
        return this[Values]![propertyKey];
      }
      if (initializer) {
        return (this[Values] = this[Values] || {})[propertyKey] = initializer.call(this);
      }
    },
    set(this: Container, value: any) {
      const values = this[Values] = this[Values] || {};
      if (values[propertyKey] !== value) {
        values[propertyKey] = value;
        notify(this);
      }
    },
    configurable: false,
    enumerable: true,
  };
}

export function subscribe(container: Container, updater: Updater) {
  const updaters = container[Updaters] = container[Updaters] || [];
  updaters.push(updater);
  return () => remove(updaters, updater);
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
