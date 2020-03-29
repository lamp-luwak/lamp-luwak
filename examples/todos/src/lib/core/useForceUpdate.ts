import { useReducer } from "react";
import { VoidFunction } from "./types";

const reducer = (state: boolean, _action: null): boolean => !state;

export const useForceUpdate = () => useReducer(reducer, true)[1] as VoidFunction;
