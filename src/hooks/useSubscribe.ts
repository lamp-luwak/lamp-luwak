import { subscribe } from "~/store";
import { useState } from "~/driver";
import { useInvalidateEffect } from "./useInvalidateEffect";
import { isShouldSubscribe } from "~/subscribe";

export function useSubscribe<T>(initializer: () => T): T {
  const [[container, shouldSubscribe]] = useState(() => {
    const container = initializer();
    return [ container, isShouldSubscribe(container) ];
  });
  if (shouldSubscribe) {
    useInvalidateEffect(
      (invalidate: any) => subscribe(container, invalidate)
    );
  }
  return container;
}
