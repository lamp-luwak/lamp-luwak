import { useEffect } from "react";
import { useForceUpdate } from "./useForceUpdate";
import { Dep, provide } from "./di";
import { subscribe } from "./subscriber";

export const useProvide = <T>(dep: Dep<T>): T => {
  const instance = provide(dep);
  const forceUpdate = useForceUpdate();
  useEffect(
    () =>  subscribe(instance, forceUpdate),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [instance]
  );
  return instance;
};
