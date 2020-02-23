import { useState, useEffect } from "~/driver";

export function useInvalidateEffect(effect: any) {
  const [, updateState] = useState();
  const invalidateReactComponent = () => updateState({});
  useEffect(() => effect(invalidateReactComponent));
}
