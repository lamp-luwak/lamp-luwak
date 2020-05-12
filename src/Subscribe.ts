import { ReactNode, ReactElement } from "react";
import { useStores } from "./useStore";
import { ObjectMap } from "./types";

type Ret = ReactNode | ReactElement | null;
type Props<T extends ObjectMap, R> = T & {
  children: (props: T) => R;
};

export const Subscribe = <T, R = Ret>(props: Props<T, R>): R => {
  const values = Object.keys(props)
    .filter((key) => key !== "children")
    .map((key) => (props as ObjectMap)[key]);

  useStores(...values);
  return props.children(props);
};
