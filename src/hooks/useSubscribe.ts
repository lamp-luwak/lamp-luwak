import { subscribe } from "~/store";
import { useState } from "~/driver";
import { useInvalidateEffect } from "./useInvalidateEffect";

export function useSubscribe<T>(initializer: () => T): T {
  const [ container ] = useState(initializer);
  useInvalidateEffect(
    (invalidate: any) => subscribe(container, invalidate)
  );
  return container;
}
