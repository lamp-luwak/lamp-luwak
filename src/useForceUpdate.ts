import { useReducer } from "react";

type VoidFunction = () => void;

const reducer = (state: number, _action: null): number => (state + 1) % 0xffffff;

export const useForceUpdate = () => useReducer(reducer, 0)[1] as VoidFunction;
