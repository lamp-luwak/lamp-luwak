import { Accessable, get, set} from "./store";

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

