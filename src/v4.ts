
const StoreState = "state";
const StoreChan = Symbol("StoreChan");

interface Store<S> {
  readonly [StoreState]: S;
}

export function create(): Store<undefined>;
export function create<S>(store: Store<S>): Store<S>;
export function create<S>(initialState: S): Store<S>;
export function create(a?: any): any {
  return {
    [StoreState]: a,
    [StoreChan]: chan()
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

export function watch() {

}


const ChanReceivers = Symbol("ChanReceivers");

interface Chan {
  [ChanReceivers]: any[];
}

export function chan(): Chan {
  return {
    [ChanReceivers]: []
  };
}

export function receive(chan: Chan, receiver: any) {
  chan[ChanReceivers].push(receiver);
}

export function send(chan: Chan, signal: any) {
  for (const receiver of chan[ChanReceivers]) {
    receiver(signal);
  }
}
