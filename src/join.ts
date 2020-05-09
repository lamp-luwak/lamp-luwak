import { Accessable, watch, set, get } from "./store";
import { Lens, View, view } from "./lens";

export function connect(src: Accessable, dest: View): () => void;
export function connect(src: Accessable, dest: Accessable, lens: Lens): () => void;
export function connect(src: any, dest: any, lens?: any): any {
  const destView = arguments.length === 3
    ? view(dest, lens)
    : dest

  const offs = [] as any[];
  offs[0] = watch(src, (state) => {
    set(destView, state);
  });
  offs[1] = watch(destView, (state) => {
    set(src, state);
  });
  return () => {
    for (const fn of offs) {
      fn();
    }
  };
}

export function join<T extends Accessable>(src: T, dest: View): T;
export function join<T extends Accessable>(src: T, dest: Accessable, lens: Lens): T;
export function join(...args: any[]): any {
  (connect as any)(...args);
  return args[0];
}
