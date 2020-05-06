import { useMemo } from "react";
import { unserialize } from "./ssr";

export function useUnserialize(data: any) {
  useMemo(() => {
    unserialize(data);
  }, [data]);
}
