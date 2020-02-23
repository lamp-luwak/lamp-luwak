import { Dep } from "~/di/types";
import { resolve } from "~/di";
import { subscribe } from "~/store";
import { useInvalidateEffect } from "./useInvalidateEffect";

export function useProvide<T>(dep: Dep<T>): T {
  const instance = resolve(dep);
  useInvalidateEffect(
    (invalidate: any) => subscribe(instance, invalidate)
  );
  return instance;
}
