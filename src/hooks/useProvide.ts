import { Dep } from "~/di/types";
import { resolve } from "~/di";
import { useSubscribe } from "./useSubscribe";

export function useProvide<T>(dep: Dep<T>): T {
  return useSubscribe(() => resolve(dep));
}
