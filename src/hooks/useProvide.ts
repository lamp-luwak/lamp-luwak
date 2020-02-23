import { useState } from "~/driver";
import { Dep } from "~/di/types";
import { resolve } from "~/di";
import { subscribe } from "~/store";
import { useInvalidateEffect } from "./useInvalidateEffect";
import { isShouldSubscribe } from "~/subscribe";

export function useProvide<T>(dep: Dep<T>): T {
  const [[instance, shouldSubscribe]] = useState(() => {
    const instance = resolve(dep);
    return [ instance, isShouldSubscribe(instance) ];
  });
  if (shouldSubscribe) {
    useInvalidateEffect(
      (invalidate: any) => subscribe(instance, invalidate)
    );
  }
  return instance;
}
