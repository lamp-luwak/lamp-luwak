import { ObjectMap, PropertyKey, Dep, DepResolvePhase } from "./types";
import { RootZoneId } from "./consts";
import { isContainer } from "~/store";
import { subscribe } from "~/subscribe";
import { isReactComponent } from "~/driver";

const instances: ObjectMap<Map<Dep, any>> = {};
const resolvePhases: ObjectMap<Map<Dep, DepResolvePhase>> = {};
const overrides: ObjectMap<Map<Dep, any>> = {};
const zoneIndex: ObjectMap<number> = {};
let zoneId: number = RootZoneId;

export const state = {
  instances, resolvePhases, overrides, zoneIndex
};

let asyncHook: any;

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
        const rootAsyncId = zoneIndex[triggerAsyncId];
        if (rootAsyncId) {
          zoneIndex[asyncId] = rootAsyncId;
        }
      },
      before(asyncId: number) {
        zoneId = zoneIndex[asyncId] || RootZoneId;
      },
      destroy(asyncId: number) {
        delete zoneIndex[asyncId];
      },
    }).enable();
  }
  return new Promise((resolve, reject) => {
    process.nextTick(async () => {
      const asyncId = asyncHooks.executionAsyncId();
      zoneId = zoneIndex[asyncId] = asyncId;
      try {
        await callback();
        resolve();
      } catch (error) {
        reject(error);
      }
      cleanupZone(asyncId);
    });
  });
}

export function getZoneId(): number {
  return zoneId;
}

export function provide(target: object, propertyKey: PropertyKey): any;
export function provide(dep: Dep): (target: object, propertyKey: PropertyKey) => any;
export function provide(targetOrDep: any, propertyKey?: any): any {
  if (typeof propertyKey === "undefined") {
    const dep: Dep = targetOrDep;
    return (_target: object, propertyKey: PropertyKey): any => (
      createProvideDescriptor(dep, propertyKey)
    );
  }
  if (typeof Reflect !== "undefined" && typeof (Reflect as any).getMetadata === "function") {
    const dep = (Reflect as any).getMetadata("design:type", targetOrDep, propertyKey);
    if (dep) {
      return createProvideDescriptor(dep, propertyKey);
    }
  }
  throw new Error(`Cannot resolve type of dependency by reflect metadata for key "${propertyKey}"`);
}

export function resolve<T>(dep: Dep<T>): T {
  let instance = getInstance(dep);
  if (!instance) {
    const OverrideDep = getOverride(dep);
    if (typeof OverrideDep !== "undefined") {
      setInstance(dep, instance = resolve(OverrideDep));
      return instance;
    }
    setResolvePhase(dep, DepResolvePhase.Start);
    if (typeof dep === "function") {
      instance = (typeof dep.prototype === "undefined")
        ? (dep as () => T)()
        : new (dep as new () => T)();
    } else {
      instance = dep;
    }
    setInstance(dep, instance);
    setResolvePhase(dep, DepResolvePhase.Finish);
  }
  return instance;
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

export function getInstances() {
  if (typeof instances[zoneId] === "undefined") {
    return [];
  }
  return [ ...instances[zoneId].values() ];
}

export function cleanup() {
  Object.keys(instances).forEach((id) => {
    instances[id].clear();
    delete instances[id];
  });
  Object.keys(resolvePhases).forEach((id) => {
    resolvePhases[id].clear();
    delete resolvePhases[id];
  });
}

export function reset() {
  cleanup();
  Object.keys(overrides).forEach((id) => {
    overrides[id].clear();
    delete overrides[id];
  });
}

function cleanupZone(zoneId: number) {
  if (instances[zoneId]) {
    instances[zoneId].clear();
    delete instances[zoneId];
  }
  if (resolvePhases[zoneId]) {
    resolvePhases[zoneId].clear();
    delete resolvePhases[zoneId];
  }
}

function createProvideDescriptor(dep: Dep, propertyKey: PropertyKey) {
  return {
    get() {
      const instance = resolve(dep);
      Object.defineProperty(this, propertyKey, {
        value: instance,
        enumerable: true,
        configurable: false,
        writable: false,
      });
      if (isReactComponent(this) && isContainer(instance)) {
        subscribe(this as any, instance);
      }
      return instance;
    },
    enumerable: true,
    configurable: true,
  };
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
  if (typeof instances[zoneId] === "undefined") {
    instances[zoneId] = new Map();
  }
  instances[zoneId].set(dep, instance);
}

function getInstance(dep: Dep): any {
  if (typeof instances[zoneId] !== "undefined") {
    return instances[zoneId].get(dep);
  }
}

function setOverride(from: Dep, to: Dep) {
  if (typeof overrides[zoneId] === "undefined") {
    overrides[zoneId] = new Map();
  }
  overrides[zoneId].set(from, to);
}

function getOverride(from: Dep): Dep | undefined {
  let id = zoneId;
  for (;;) {
    if (typeof overrides[id] !== "undefined") {
      const to = overrides[id].get(from);
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
