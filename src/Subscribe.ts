import { useSubscribe } from "./useSubscribe";

export const Subscribe = ({ children, ...props }: any) => {
  useSubscribe(...Object.keys(props).map((key) => (props)[key]));
  return children(props);
};
