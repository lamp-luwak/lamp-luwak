import { multi, receive, send, blank } from "./chan";
import { prop } from "./prop";
import { View, propLensView, read, write, readState } from "./lens";
import { ClassType, FuncType } from "./types";

const StoreState = "state";
const StorePrevState = Symbol("StorePrevState");
const StoreChan = Symbol("StoreChan");
export const StoreFactory = Symbol("StoreFactory");

export interface Store<S = any> {
  [StoreState]: S;
}
export type Accessable<S = any> = Store<S> | View;

const propStoreChan = prop(StoreChan, blank);
const propStoreState = prop(StoreState);
const propStorePrevState = prop(StorePrevState);
const propStoreFactory = prop(StoreFactory);

export function store(): Store<undefined>;
export function store<K, M>(store: Accessable<K>, selector: (state: K) => M): Store<M>;
export function store<K, L, M>(storeA: Accessable<K>, storeB: Accessable<L>, selector: (stateA: K, stateB: L) => M): Store<M>;
export function store<S>(initialState: S): Store<S>;
export function store<A>(Class: ClassType<A>): A;
export function store<A, P extends any[]>(Class: ClassType<A, P>, ...args: P): A;
export function store<A>(Fn: FuncType<A>): A;
export function store<A, P extends any[]>(Fn: FuncType<A, P>, ...args: P): A;
export function store(...args: any[]): any {
  let inst = {} as any;

  if (typeof args[0] === "function") {
    const fn = args[0];
    if (typeof fn.prototype !== "undefined") {
      inst = new (fn as new (...args: any[]) => any)(...args.slice(1));
    } else {
      inst = (fn as (...args: any[]) => any)(...args.slice(1));
      if (!inst || typeof inst !== "object") {
        throw new Error("Only object supported for function return.");
      }
      propStoreFactory(inst, fn);
    }
  }
  else if (args.length <= 1) {
    propStoreState(inst, args[0]);
  }
  else {
    const fn = args[args.length - 1];
    const stores = args.slice(0, -1);
    propStoreState(inst, fn(
      ...stores.map(get)
    ));
    (watch as any)(...stores, (...args: any[]) => {
      set(inst, fn(...args));
    });
  }
  return inst;
}

export function extend<S, T>(store: Store<S>, additional: T): Store<S> & T {
  Object.assign(store, additional);
  return store as Store<S> & T;
}

export function get<S>(store: Accessable<S>): S {
  if (propLensView(store)) {
    return read(store as View);
  }
  return propStoreState(store);
}

export function set<S>(store: Accessable<S>, state: S): void;
export function set<S>(store: Accessable<S>, callback: (state: S) => S): void;
export function set(store: any, state: any) {
  if (propLensView(store)) {
    return write(store as View, state);
  }
  const prevState = propStoreState(store);
  if (typeof state == "function") {
    state = state(prevState);
  }
  if (state !== prevState) {
    propStorePrevState(store, prevState);
    propStoreState(store, state);
    send(propStoreChan(store));
  }
}

function storeWatch<S>(store: Store<S>, callback: (state: S, prevState: S) => void): () => void;
function storeWatch<A, B>(storeA: Store<A>, storeB: Store<B>, callback: (stateA: A, stateB: B, prevStateA: A, prevStateB: B) => void): () => void;
function storeWatch(...args: any[]) {
  const fn = args[args.length - 1];
  const stores = args.slice(0, -1);
  const receiver = () => {
    fn(
      ...stores.map(propStoreState),
      ...stores.map(propStorePrevState)
    );
  };
  if (stores.length === 1) {
    return receive(propStoreChan(stores[0]), receiver);
  } else {
    return receive(multi(...stores.map(propStoreChan)), receiver);
  }
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

  const len = stores.length;

  const watchStores = stores.slice();
  for (let i = 0; i < views.length; i++) {
    watchStores[i] = watchStores[i][0];
  }
  return (storeWatch as any)(...watchStores, (...args: any[]) => {
    let hasChanging = false;
    for (let i = 0; i < views.length; i++) {
      const j = views[i];
      const l = stores[j][1];
      args[j] = readState(args[j], l);
      args[j + len] = readState(args[j + len], l);
      hasChanging = hasChanging || args[j] !== args[j + len];
    }
    if (hasChanging) {
      fn(...args);
    }
  });
}
