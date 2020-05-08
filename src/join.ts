import { Store } from "./store";
import { watch, set, get } from "./access";
import { Lens, View, view } from "./lens";

export function join(src: Store | View, dest: View): void;
export function join(src: Store | View, dest: Store | View, lens: Lens): void;
export function join(src: any, dest: any, lens?: Lens): any {
  const destView = typeof lens !== "undefined"
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
