import { ClassType, PropertyKey, Container, Updater, Notifier } from "./types";
import { Updaters, Keys, Values } from "./consts";

export function factory(notifier?: Notifier) {

  const initialValues = new Map<ClassType, object>();

  function store(target: object, propertyKey: PropertyKey, descriptor?: any): any {
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

  function addKey(target: object, key: string) {
    const container = target as Container;
    (container[Keys] = container[Keys] || []).push(key);
  }

  function subscribe(target: object, updater: Updater) {
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

  function isContainer(target: object) {
    return target && !!(target as Container)[Keys];
  }

  function values(target: object) {
    return (target as Container)[Values] || {};
  }

  function make(Class: ClassType, data: object) {
    setInitialValues(Class, data);
    const inst = new Class();
    for (const key of inst[Keys] || []) {
      if (data.hasOwnProperty(key)) {
        (inst[Values] = inst[Values] || {})[key] = (data as any)[key];
      }
    }
    unsetInitialValues(Class);
    return inst;
  }

  function setInitialValues(Class: ClassType, data: object) {
    initialValues.set(Class, data);
  }

  function unsetInitialValues(Class: ClassType) {
    initialValues.delete(Class);
  }

  function cleanup() {
    initialValues.clear();
  }

  function notify(target: object) {
    const container = target as Container;
    if (container[Updaters]) {
      for (const updater of container[Updaters]!) {
        updater();
      }
    }
    if (notifier) {
      notifier(target);
    }
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

  return {
    store,
    subscribe,
    isContainer,
    values,
    make,
    setInitialValues,
    unsetInitialValues,
    cleanup,
    state: {
      initialValues
    }
  }
}
