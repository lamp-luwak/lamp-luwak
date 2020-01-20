import { ObjectMap, Dep, DepResolvePhase } from "./types";
import { RootZoneId } from "./consts";

export default {
  instances: {} as ObjectMap<Map<Dep, any>>,
  overrides: {} as ObjectMap<Map<Dep, any>>,
  resolvePhases: {} as ObjectMap<Map<Dep, DepResolvePhase>>,
  zoneId: RootZoneId,
  asyncHook: null as any,
  zoneIndex: {} as ObjectMap<number>,
  zoneParentIndex: {} as ObjectMap<number>,
};
