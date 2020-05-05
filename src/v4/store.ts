import { multi, receive, send } from "./chan";
import { prop } from "./prop";
import { ClassType, FuncType } from "./types";

const StoreState = "state";
const StorePrevState = Symbol("StorePrevState");
const StoreChan = Symbol("StoreChan");
const StoreFactory = Symbol("StoreFactory");

interface Store<S> {
  readonly [StoreState]: S;
}

const propStoreChan = prop(StoreChan, () => ({}));
const propStoreState = prop(StoreState);
const propStorePrevState = prop(StorePrevState);
const propStoreFactory = prop(StorePrevState);

export function store(): Store<undefined>;
export function store<K, M>(store: Store<K>, selector: (state: K) => M): Store<M>;
export function store<K, L, M>(storeA: Store<K>, storeB: Store<L>, selector: (stateA: K, stateB: L) => M): Store<M>;
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
      ...stores.map(propStoreState)
    ));
    receive(multi(...stores.map(propStoreChan)), () => {
      set(inst, fn(...stores.map(propStoreState)));
    });
  }
  return inst;
}

export function extend<S, T>(store: Store<S>, additional: T): Store<S> & T {
  Object.assign(store, additional);
  return store as Store<S> & T;
}

export function get<S>(store: Store<S>): S {
  return propStoreState(store);
}

export function set<S>(store: Store<S>, state: S): void;
export function set<S>(store: Store<S>, callback: (state: S) => S): void;
export function set(store: any, state: any) {
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

export function update<S>(store: Store<S>, state: Partial<S>): void;
export function update<S>(store: Store<S>, callback: (state: S) => Partial<S>): void;
export function update(store: any, state: any) {
  const prevState = propStoreState(store);
  if (typeof state == "function") {
    state = state(prevState);
  }
  set(store, {
    ...prevState,
    ...state
  });
}

export function watch<S>(store: Store<S>, callback: (state: S, prevState: S) => void): void;
export function watch<A, B>(storeA: Store<A>, storeB: Store<B>, callback: (stateA: A, stateB: B, prevStateA: A, prevStateB: B) => void): void;
export function watch(...args: any[]) {
  const fn = args[args.length - 1];
  const stores = args.slice(0, -1);
  const receiver = () => {
    fn(
      ...stores.map(propStoreState),
      ...stores.map(propStorePrevState)
    );
  };
  if (stores.length === 1) {
    receive(propStoreChan(stores[0]), receiver);
  } else {
    receive(multi(...stores.map(propStoreChan)), receiver);
  }
}

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

export function modify<T>(store: Store<T>): T;
export function modify<T>(store: Store<T>, callback: (context: T) => void): void;
export function modify(store: Store<any>, callback?: (context: any) => void): any {
  if (callback) {
    let state = propStoreState(store);
    const context = level(state, (s) => state = s)
    callback(context);
    set(store, state);
  } else {
    return level(propStoreState(store), (state) => set(store, state));
  }
}
