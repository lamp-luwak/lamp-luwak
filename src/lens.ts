import { Accessable, get, set } from "./store";
import { prop } from "./prop";

export const LensComposite = Symbol("LensComposite");
export const LensView = Symbol("LensView");

export const propLensComposite = prop(LensComposite);
export const propLensView = prop(LensView);

type RawLens<S = any, R = any> = [
  (state: S) => R,
  (state: S, value: any) => S
];
type CompositeLens = {
  [LensComposite]: boolean;
}
export type Lens = CompositeLens | string;
export type View = {
  [LensView]: boolean;
}

export function lens(...pieces: (Lens | RawLens)[]): Lens {
  const composite = [] as any;
  for (const piece of pieces as any) {
    if (propLensComposite(piece)) {
      composite.push(...piece);
    } else {
      composite.push(piece);
    }
  }
  propLensComposite(composite, true);
  return composite;
}

export function view(store: Accessable, l: Lens): View {
  let lenses = [] as any;
  if (propLensView(store)) {
    [ store, lenses ] = store as any;
  }
  const v = [ store, lens(...lenses, l) ];
  propLensView(v, true);
  return v as any;
}

function readOne(state: any, lens: RawLens) {
  if (Array.isArray(lens)) {
    return lens[0](state);
  }
  else {
    if (typeof state !== "undefined") {
      return state[lens as any];
    }
    return state;
  }
}

export function readState(state: any, lens: Lens) {
  for (const l of lens as any) {
    state = readOne(state, l);
  }
  return state;
}

export function read(view: View): any;
export function read(store: Accessable, lens: Lens): any;
export function read(store: any, lens?: any) {
  if (arguments.length === 1) {
    return (read as any)(...store);
  }
  [ store, lens ] = view(store, lens) as any;
  return readState(get(store), lens);
}

function writeOne(state: any, lens: RawLens, value: any) {
  if (Array.isArray(lens)) {
    return lens[1](state, value);
  }
  else {
    return {
      ...state,
      [lens as any]: value
    }
  }
}

export function write(view: View, value: any): void;
export function write(view: View, callback: (state: any) => any): void;
export function write(store: Accessable, lens: Lens, value: any): void;
export function write(store: Accessable, lens: Lens, callback: (state: any) => any): void;
export function write(store: any, lens?: any, value?: any) {
  if (arguments.length === 2) {
    return (write as any)(...store, lens);
  }
  [ store, lens ] = view(store, lens) as any;
  let state = get(store);
  const queue = [] as any[];
  const last = lens.length - 1;
  for (let i = 0; i <= last; i++) {
    if (i !== last) {
      queue.push(state);
      state = readOne(state, lens[i]);
    }
    else {
      const prev = readOne(state, lens[i]);
      if (typeof value === "function") {
        value = value(prev);
      }
      if (value === prev) {
        return;
      }
      state = writeOne(state, lens[i], value);
      for (let j = i - 1; j >= 0; j--) {
        state = writeOne(queue.pop(), lens[j], state);
      }
    }
  }
  set(store, state);
}
