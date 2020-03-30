import { ObjectMap } from "./types";

type WithStore<T> = {
  store: T;
};

function level(store: any, write: (value: any) => void) {
  if (!store || typeof store !== "object") {
    throw new Error("Only current value schema supported");
  }

  const properties = {} as ObjectMap;
  Object.keys(store).forEach((key) => {
    const writeKey = (value: any) => store = write({
      ...store,
      [key]: value
    });
    properties[key] = {
      get: () => level(store[key], writeKey),
      set: writeKey
    };
  });
  const proxy = {};
  Object.defineProperties(proxy, properties);
  return proxy;
}

export function modify<T>(self: WithStore<T>): T;
export function modify<T>(self: WithStore<T>, callback: (context: T) => void): void;
export function modify(self: WithStore<any>, callback?: (context: any) => void): any {
  if (callback) {
    let store = self.store;
    const context = level(store, (s) => store = s)
    callback(context);
    if (store !== self.store) {
      self.store = store;
    }
  } else {
    return level(self.store, (store) => self.store = store);
  }
}
