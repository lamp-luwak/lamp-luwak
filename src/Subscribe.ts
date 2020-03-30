import { useSubscribe } from "./useSubscribe";

export const Subscribe = (props: any) => {
  const values = Object.keys(props)
    .filter((key) => key !== "children")
    .map((key) => props[key]);

  useSubscribe(...values);
  return props.children(props);
};
