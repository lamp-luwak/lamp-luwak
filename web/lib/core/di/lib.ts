import "reflect-metadata";
import { Component } from "react";
import { getZoneId, getZoneParentId, onZoneDestroy } from "../zone/lib";
import { isStoreContainer } from "../store/lib";
import { subscribe } from "../subscribe/lib";
import { PropertyKey, Dep, DepResolvePhase } from "./types";
import state from "./state";

const { instances, overrides, resolvePhases } = state;

/**
 * Property decorator
 */
export function provide(target: object, propertyKey: PropertyKey): any {
  const Class = Reflect.getMetadata("design:type", target, propertyKey);

  ensureZoneDestroyListener();
  return {
    get() {
      const instance = resolve(Class);
      Object.defineProperty(this, propertyKey, {
        value: instance,
        enumerable: true,
        configurable: false,
        writable: false,
      });
      if (this instanceof Component && isStoreContainer(instance)) {
        subscribe(this, instance);
      }
      return instance;
    },
    enumerable: true,
    configurable: true,
  };
}

export function resolve<T>(dep: Dep<T>): T {
  let instance;
  if (!dep) {
    return dep;
  }
  instance = getInstance(dep);
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

export function getCurrentInstances() {
  const zoneId = getZoneId();
  if (typeof instances[zoneId] === "undefined") {
    return [];
  }
  return instances[zoneId].values();
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

function ensureZoneDestroyListener() {
  if (!state.zoneDestroyListenerAdded) {
    onZoneDestroy(cleanupZone);
    state.zoneDestroyListenerAdded = true;
  }
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

function setResolvePhase(dep: Dep, phase: DepResolvePhase) {
  const zoneId = getZoneId();
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
  const zoneId = getZoneId();
  if (typeof instances[zoneId] === "undefined") {
    instances[zoneId] = new Map();
  }
  instances[zoneId].set(dep, instance);
}

function getInstance(dep: Dep): any {
  const zoneId = getZoneId();
  if (typeof instances[zoneId] !== "undefined") {
    return instances[zoneId].get(dep);
  }
}

function setOverride(from: Dep, to: Dep) {
  const zoneId = getZoneId();
  if (typeof overrides[zoneId] === "undefined") {
    overrides[zoneId] = new Map();
  }
  overrides[zoneId].set(from, to);
}

function getOverride(from: Dep): Dep | undefined {
  const zoneId = getZoneId();
  let id = zoneId;
  while (typeof id !== "undefined") {
    if (typeof overrides[id] !== "undefined") {
      const to = overrides[id].get(from);
      if (typeof to !== "undefined") {
        return to;
      }
    }
    id = getZoneParentId(id);
  }
}
