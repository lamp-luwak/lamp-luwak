
import { useEffect } from "react";
import { subscribe } from "./subscriber";
import { useForceUpdate } from "./useForceUpdate";

export const useSubscribe = (...items: any[]) => {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    const unsubscribers = items.map((item) => subscribe(item, forceUpdate));
    return () => {
      for (const unsubscriber of unsubscribers.slice()) {
        unsubscriber();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...items]);
};
