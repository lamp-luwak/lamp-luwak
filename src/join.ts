import { Store, watch, set, get } from "./store";

function readOne(state: any, path: string): any {
  return (state || {})[path];
}

function read(state: any, paths: string[]): any {
  for (const path of paths) {
    state = readOne(state, path);
  }
  return state;
}

function writeOne(state: any, path: string, value: any): any {
  return {
    ...state,
    [path]: value
  }
}

function write(state: any, paths: string[], value: any): any {
  const originState = state;
  const queue = [] as any[];
  const last = paths.length - 1;
  for (let i = 0; i <= last; i++) {
    if (i !== last) {
      queue.push(state);
      state = readOne(state, paths[i]);
    }
    else {
      const prev = readOne(state, paths[i]);
      if (value === prev) {
        return originState;
      }
      state = writeOne(state, paths[i], value);
      for (let j = i - 1; j >= 0; j--) {
        state = writeOne(queue.pop(), paths[j], state);
      }
    }
  }
  return state;
}

export function join<T extends Store>(src: T, dest: Store, ...paths: string[]): T {
  watch(src, (state) => {
    set(dest, write(get(dest), paths, state));
  });
  watch(dest, (state) => {
    set(src, read(state, paths));
  });

  return src;
}
