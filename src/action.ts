import { dispatch } from "./subscriber";

export const action = () => {
  function handler(...args: any[]) {
    dispatch(handler, ...args);
  }
  return handler;
}
