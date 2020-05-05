import { multi, chan, receive, send, blank } from "./v4/chan";
export { multi, chan, receive, send, blank };

const StoreState = "state";
const StoreChan = Symbol("StoreChan");

interface Store<S> {
  readonly [StoreState]: S;
}

export function store(): Store<undefined>;
export function store<S>(store: Store<S>): Store<S>;
export function store<S>(initialState: S): Store<S>;
export function store(a?: any): any {
  return {
    [StoreState]: a,
    [StoreChan]: blank()
  };
}

export function extend() {

}

export function modify() {

}

export function get() {

}

export function set<S>(store: Store<S>, value: S): void;
export function set<S>(store: Store<S>, callback: (state: S) => S): void;
export function set(store: any, value: any) {
  const previous = store[StoreState];
  if (typeof value == "function") {
    value = value(previous);
  }
  if (value !== previous) {
    store[StoreState] = value;
    send(store[StoreChan], [value, previous]);
  }
}

export function update() { // TODO: make test

}

export function watch() {

}
