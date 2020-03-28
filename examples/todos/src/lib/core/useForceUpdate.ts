import { useCallback, useReducer } from "react";
import { VoidFunction } from "./types";

const reducer = (state: boolean, _action: null): boolean => !state;

export const useForceUpdate = (): VoidFunction => {
  const [, dispatch] = useReducer(reducer, true);
  const memoizedDispatch = useCallback((): void => {
    console.log("FORCE-UPDATE");
    console.log(new Error());
    dispatch(null);
  }, [dispatch]);
  return memoizedDispatch;
}
