import { ObjectMap } from "../types";
import { Dep, DepResolvePhase } from "./types";

export default {
  instances: {} as ObjectMap<Map<Dep, any>>,
  overrides: {} as ObjectMap<Map<Dep, any>>,
  resolvePhases: {} as ObjectMap<Map<Dep, DepResolvePhase>>,
  zoneDestroyListenerAdded: false,
};
