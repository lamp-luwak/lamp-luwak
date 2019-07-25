import { ObjectMap } from "../types";
import { RootZoneId } from "./consts";

export default {
  currentId: RootZoneId,
  hook: null as any,
  index: {} as ObjectMap<number>,
  parentIndex: {} as ObjectMap<number>,
};
