import { Store } from "./store";
import { watch, set } from "./access";
import { Lens, View, view } from "./lens";

export function join(src: Store | View, dest: View): void;
export function join(src: Store | View, dest: Store | View, lens: Lens): void;
export function join(src: any, dest: any, lens?: Lens): any {
  if (typeof lens === "undefined") {
    return (join as any)(src, ...dest);
  }
  const offs = [] as any[];
  const destView = view(dest, lens);
  offs[0] = watch(src, (state) => {
    console.log(">>>>>_000");
    set(destView, state);
  });
  offs[1] = watch(destView, (state) => {
    console.log(">>>>>_111");
    set(src, state);
  });
  return () => {
    for (const fn of offs) {
      fn();
    }
  };
}
