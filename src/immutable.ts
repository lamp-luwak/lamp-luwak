import { ObjectMap } from "./types";

function level(store: any, write: (store: any) => void) {
  if (!store || typeof store === "object") {
    throw new Error("Only current value schema supported");
  }

  const properties = {} as ObjectMap;
  Object.keys(store).forEach((key) => {
    const writeKey = (store: any) => write({
      ...store,
      [key]: store
    });
    properties[key] = {
      get: () => level(store[key], writeKey),
      set: writeKey as (value: any) => void
    };
  });
  const proxy = {};
  Object.defineProperties(proxy, properties);
  return proxy;
}

export const modify = (self: any, callback?: (context: any) => void) => {
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
};
