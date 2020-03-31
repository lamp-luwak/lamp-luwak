import { ObjectMap, ClassType, FuncType } from "./types";
import { create } from "./store";

export type Dep<T = any> = ClassType<T> | FuncType<T>;
enum DepResolvePhase {
  Start,
  Finish,
}

export const RootZoneId = 0;

const instancesMap: ObjectMap<Map<Dep, any>> = {};
const resolvePhases: ObjectMap<Map<Dep, DepResolvePhase>> = {};
const overridePairs: ObjectMap<Map<Dep, Dep>> = {};
const zoneTreeIndex: ObjectMap<number> = {};
let zoneId: number = RootZoneId;
let asyncHook: any;

export const getZoneId = (): number => {
  return zoneId;
}
export const getInternalState = () => ({
  instancesMap, resolvePhases, overridePairs, zoneTreeIndex
});

export async function zone<T = void>(callback: () => T): Promise<void> {
  if (zoneId !== RootZoneId) {
    throw new Error("Nested zone is not available");
  }
  const asyncHooks = (typeof process !== "undefined" && !(process as any).browser)
    ? require("async_hooks")
    : null;
  if (!asyncHooks) {
    await callback();
    return;
  }
  if (typeof asyncHook === "undefined") {
    asyncHook = asyncHooks.createHook({
      init(asyncId: number, _type: any, triggerAsyncId: number) {
        const rootAsyncId = zoneTreeIndex[triggerAsyncId];
        if (rootAsyncId) {
          zoneTreeIndex[asyncId] = rootAsyncId;
        }
      },
      before(asyncId: number) {
        zoneId = zoneTreeIndex[asyncId] || RootZoneId;
      },
      destroy(asyncId: number) {
        delete zoneTreeIndex[asyncId];
      },
    }).enable();
  }
  return new Promise((resolve, reject) => {
    process.nextTick(async () => {
      const asyncId = asyncHooks.executionAsyncId();
      zoneId = zoneTreeIndex[asyncId] = asyncId;
      try {
        await callback();
        resolve();
      } catch (error) {
        reject(error);
      }
      resetZone(asyncId);
    });
  });
}

export function provide<T>(dep: Dep<T>): T {
  let instance = getInstance(dep);
  if (!instance) {
    const OverrideDep = getOverride(dep);
    if (typeof OverrideDep !== "undefined") {
      setInstance(dep, instance = provide(OverrideDep));
      return instance;
    }
    setResolvePhase(dep, DepResolvePhase.Start);
    instance = create(dep);
    setInstance(dep, instance);
    setResolvePhase(dep, DepResolvePhase.Finish);
  }
  return instance;
}

export function resolved(dep: Dep): boolean {
  return !!getInstance(dep);
}

export function override(from: Dep, to: Dep) {
  setOverride(from, to);
}

export function assign(dep: Dep, instance: any) {
  setInstance(dep, instance);
  const OverrideDep = getOverride(dep);
  if (typeof OverrideDep !== "undefined") {
    assign(OverrideDep, instance);
  }
}

export function instances() {
  if (typeof instancesMap[zoneId] === "undefined") {
    return [];
  }
  return [ ...instancesMap[zoneId].values() ];
}

export function cleanup() {
  Object.keys(instancesMap).forEach((id) => {
    instancesMap[id].clear();
    delete instancesMap[id];
  });
  Object.keys(resolvePhases).forEach((id) => {
    resolvePhases[id].clear();
    delete resolvePhases[id];
  });
}

export function reset() {
  cleanup();
  Object.keys(overridePairs).forEach((id) => {
    overridePairs[id].clear();
    delete overridePairs[id];
  });
}

function resetZone(zoneId: number) {
  if (instancesMap[zoneId]) {
    instancesMap[zoneId].clear();
    delete instancesMap[zoneId];
  }
  if (resolvePhases[zoneId]) {
    resolvePhases[zoneId].clear();
    delete resolvePhases[zoneId];
  }
  if (overridePairs[zoneId]) {
    overridePairs[zoneId].clear();
    delete overridePairs[zoneId];
  }
}

function setResolvePhase(dep: Dep, phase: DepResolvePhase) {
  if (typeof resolvePhases[zoneId] === "undefined") {
    resolvePhases[zoneId] = new Map();
  }
  const currentPhase = resolvePhases[zoneId].get(dep);
  if (currentPhase === DepResolvePhase.Start && phase === DepResolvePhase.Start) {
    throw new Error("Circular dependency detected");
  }
  if (phase === DepResolvePhase.Finish) {
    resolvePhases[zoneId].delete(dep);
  } else {
    resolvePhases[zoneId].set(dep, phase);
  }
}

function setInstance(dep: Dep, instance: any) {
  if (typeof instancesMap[zoneId] === "undefined") {
    instancesMap[zoneId] = new Map();
  }
  instancesMap[zoneId].set(dep, instance);
}

function getInstance(dep: Dep): any {
  if (typeof instancesMap[zoneId] !== "undefined") {
    return instancesMap[zoneId].get(dep);
  }
}

function setOverride(from: Dep, to: Dep) {
  if (typeof overridePairs[zoneId] === "undefined") {
    overridePairs[zoneId] = new Map();
  }
  overridePairs[zoneId].set(from, to);
}

function getOverride(from: Dep): Dep | undefined {
  let id = zoneId;
  for (;;) {
    if (typeof overridePairs[id] !== "undefined") {
      const to = overridePairs[id].get(from);
      if (typeof to !== "undefined") {
        return to;
      }
    }
    if (id !== RootZoneId) {
      id = RootZoneId
    } else {
      break;
    }
  }
}
