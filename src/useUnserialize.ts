import { unserialize } from "./ssr";
import { useMemo } from "react";

export const useUnserialize = (data: any) => {
  useMemo(() => unserialize(data), [data]);
}
