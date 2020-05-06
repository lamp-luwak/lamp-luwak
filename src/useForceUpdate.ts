import { useReducer } from "react";

function reducer(state: number) {
  return (state + 1) % 0xffffff;
}

export function useForceUpdate() {
  return useReducer(reducer, 0)[1] as () => void;
}
