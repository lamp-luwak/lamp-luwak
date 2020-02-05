import { ClassType, PropertyKey, Container, Updater } from "./types";
import { Updaters, Keys, Values } from "./consts";
import { isReactComponent, invalidateReactComponent } from "~/driver";

const initialValues = new Map<ClassType, object>();
let notifyLocked = false;

export const state = { initialValues };

export function store(target: object, propertyKey: PropertyKey, descriptor?: any): any {
  const initializer = (descriptor || {}).initializer;

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
  return () => {
    let index = 0;
    while (index < updaters.length) {
      if (updaters[index] === updater) {
        updaters.splice(index, 1);
      } else {
        index++;
      }
    }
  };
}

export function isContainer(target: any) {
  return target && !!(target as Container)[Keys];
}

export function values(target: object) {
  return (target as Container)[Values] || {};
}

export function make(Class: ClassType, data: object) {
  setInitialValues(Class, data);
  try {
    const inst = new Class();
    for (const key of inst[Keys] || []) {
      if (data.hasOwnProperty(key)) {
        (inst[Values] = inst[Values] || {})[key] = (data as any)[key];
      }
    }
    unsetInitialValues(Class);
    return inst;
  } catch(e) {
    unsetInitialValues(Class);
    throw e;
  }
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

export function notify(target: object) {
  if (notifyLocked) {
    return;
  }
  const container = target as Container;
  if (container[Updaters]) {
    for (const updater of container[Updaters]!) {
      updater();
    }
  }
  if (isReactComponent(target)) {
    invalidateReactComponent(target);
  }
}

function setInitialValues(Class: ClassType, data: object) {
  initialValues.set(Class, data);
}

function unsetInitialValues(Class: ClassType) {
  initialValues.delete(Class);
}

function addKey(target: object, key: string) {
  const container = target as Container;
  (container[Keys] = container[Keys] || []).push(key);
}

function get(target: object, key: string, initializer?: () => any) {
  const container = target as Container;
  if (container[Values] && container[Values].hasOwnProperty(key)) {
    return container[Values][key];
  } else {
    const initialValue = getInitialValue((target as any).constructor, key);
    return (container[Values] = container[Values] || {})[key] = (typeof initialValue !== "undefined")
      ? initialValue
      : initializer && initializer();
  }
}

function set(target: object, key: string, value: any) {
  const container = target as Container;
  const values = container[Values] = container[Values] || {};
  if (values[key] !== value) {
    values[key] = value;
    notify(target);
  }
}

function getInitialValue(Class: ClassType, key: string) {
  const data = initialValues.get(Class);
  if (typeof data !== "undefined") {
    return (data as any || {})[key];
  }
}
