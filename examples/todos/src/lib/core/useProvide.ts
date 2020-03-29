import { useEffect } from "react";
import { useForceUpdate } from "./useForceUpdate";
import { ClassType } from "./types";
import { subscribe } from "./subscriber";
import { provide } from "./provide";

export const useProvide = <T>(dep: ClassType<T>): T => {
  const instance = provide(dep);
  const forceUpdate = useForceUpdate();
  useEffect(
    () =>  subscribe(instance, forceUpdate),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [instance]
  );
  return instance;
};
