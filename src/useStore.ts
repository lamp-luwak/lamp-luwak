import { useEffect } from "react";
import { Store, watch } from "./store";
import { useForceUpdate } from "./useForceUpdate";

export function useStores<T extends Store[]>(...items: T): T {
  const forceUpdate = useForceUpdate();
  useEffect(
    () => {
      const unsubscribers = items.map((item) => watch(item, forceUpdate));
      return () => {
        for (const unsubscriber of unsubscribers.slice()) {
          unsubscriber();
        }
      }
    },
    [...items]
  );
  return items;
}

export function useStore<T extends Store>(store: T): T {
  return useStores(store)[0];
}
