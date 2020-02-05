import { useInvalidateEffect } from "~/driver";
import { Dep } from "~/di/types";
import { resolve } from "~/di";
import { subscribe, isContainer } from "~/store";

export function useProvide<T>(dep: Dep<T>): T {
  const instance = resolve(dep);
  if (!isContainer(instance)) {
    return instance;
  }
  useInvalidateEffect(
    (invalidate: any) => subscribe(instance, invalidate)
  );
  return instance;
}
