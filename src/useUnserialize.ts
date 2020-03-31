import { useMemo } from "react";
import { unserialize } from "./ssr";

export const useUnserialize = (data: any) => {
  useMemo(() => {
    unserialize(data);
  }, [data]);
}
