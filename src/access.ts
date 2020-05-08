import { Store, get as storeGet, set as storeSet, watch as storeWatch} from "./store";
import { View, propLensView, read, write, readState } from "./lens";

export type Accessable<S> = Store<S> | View;

export function get<S>(store: Accessable<S>): S {
  return propLensView(store)
    ? read(store as View)
    : storeGet(store as Store);
}

export function set<S>(store: Accessable<S>, state: S): void;
export function set<S>(store: Accessable<S>, callback: (state: S) => S): void;
export function set(store: any, state: any) {
  return propLensView(store)
    ? write(store as View, state)
    : storeSet(store as Store, state);
}

export function update<S>(store: Accessable<S>, state: Partial<S>): void;
export function update<S>(store: Accessable<S>, callback: (state: S) => Partial<S>): void;
export function update(store: any, state: any) {
  const prevState = get(store);
  if (typeof state == "function") {
    state = state(prevState);
  }
  set(store, {
    ...(prevState as any),
    ...state
  });
}

export function watch<S>(store: Accessable<S>, callback: (state: S, prevState: S) => void): () => void;
export function watch<A, B>(storeA: Accessable<A>, storeB: Accessable<B>, callback: (stateA: A, stateB: B, prevStateA: A, prevStateB: B) => void): () => void;
export function watch(...args: any[]) {
  const stores = args.slice(0, -1);
  const fn = args[args.length - 1];

  const views = [] as any;
  for (let i = 0; i < stores.length; i++) {
    const store = stores[i];
    if (propLensView(store)) {
      views.push(i);
    }
  }

  if (views.length === 0) {
    return (storeWatch as any)(...args);
  }

  const len = views.length;
  const half = len / 2;

  return (storeWatch as any)(...stores, (...args: any[]) => {
    let hasChanging = false;
    for (let i = 0; i < half / 2; i++) {
      args[i] = readState(args[i], stores[i][1]);
      args[i + half] = readState(args[i + half], stores[i + half][1]);
      hasChanging = hasChanging || args[i] !== args[i + half];
    }
    if (hasChanging) {
      fn(...args);
    }
  });
}

