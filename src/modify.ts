import { Accessable, get, set } from "./store";

function level(state: any, write: (value: any) => void) {
  if (!state || typeof state !== "object") {
    throw new Error("Only current value schema supported");
  }

  const properties = {} as any;
  Object.keys(state).forEach((key) => {
    const writeKey = (value: any) => state = write({
      ...state,
      [key]: value
    });
    properties[key] = {
      get: () => level(state[key], writeKey),
      set: writeKey
    };
  });
  const proxy = {};
  Object.defineProperties(proxy, properties);
  return proxy;
}

export function modify<T>(store: Accessable<T>): T;
export function modify<T>(store: Accessable<T>, callback: (context: T) => void): void;
export function modify(store: Accessable<any>, callback?: (context: any) => void): any {
  if (callback) {
    let state = get(store);
    const context = level(state, (s) => state = s)
    callback(context);
    set(store, state);
  } else {
    return level(get(store), (state) => set(store, state));
  }
}
