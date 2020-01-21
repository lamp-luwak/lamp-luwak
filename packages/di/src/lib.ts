import { factory } from "./factory";

export const {
  zone,
  getZoneId,
  provide,
  resolve,
  override,
  assign,
  cleanup,
  reset,
  getInstances,
  instances,
  overrides,
  zoneIndex,
  zoneParentIndex
} = factory();
