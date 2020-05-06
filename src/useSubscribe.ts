import { useEffect } from "react";
import { watch } from "./store";
import { useForceUpdate } from "./useForceUpdate";

export function useSubscribe(...items: any[]) {
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
}
