import { ClassType } from "../types";
import React from "react";
import {
  StoreUpdaters,
  StoreKeys,
  StoreValues,
  StoreContainer,
  StoreUpdater,
} from "./types";
import state from "./state";

const { initialValues } = state;

/**
 * Property decorator
 */
export function store(target: object, propertyKey: string, descriptor?: any): any {
  const initializer = (descriptor || {}).initializer;

  addKey(target, propertyKey);
  return {
    get(this: StoreContainer) {
      return get(this, propertyKey, initializer);
    },
    set(this: StoreContainer, value: any) {
      set(this, propertyKey, value);
    },
    configurable: false,
    enumerable: true,
  };
}

export function subscribe(target: StoreContainer, updater: StoreUpdater) {
  const updaters = target[StoreUpdaters] = target[StoreUpdaters] || new Map<StoreUpdater, StoreUpdater>();
  updaters.set(updater, updater);
  return () => {
    updaters.delete(updater);
  };
}

export function notify(target: StoreContainer) {
  if (target[StoreUpdaters]) {
    for (const [updater] of target[StoreUpdaters]!) {
      updater();
    }
  }
  if (target instanceof React.Component) {
    target.forceUpdate();
  }
}

export function isStoreContainer(target: StoreContainer) {
  return !!target[StoreKeys];
}

export function get(target: StoreContainer, key: string, initializer?: () => any) {
  if (target[StoreValues] && target[StoreValues].hasOwnProperty(key)) {
    return target[StoreValues][key];
  } else {
    const initialValue = getInitialValue((target as any).constructor, key);
    return (target[StoreValues] = target[StoreValues] || {})[key] = (typeof initialValue !== "undefined")
      ? initialValue
      : initializer && initializer();
  }
}

export function set(target: StoreContainer, key: string, value: any) {
  const values = target[StoreValues] = target[StoreValues] || {};
  if (values[key] !== value) {
    values[key] = value;
    notify(target);
  }
}

export function serialize(target: StoreContainer) {
  return target[StoreValues];
}

export function unserialize(Ctor: ClassType, data: object) {
  const inst = new Ctor();
  for (const key of inst[StoreKeys] || []) {
    if (data.hasOwnProperty(key)) {
      (inst[StoreValues] = inst[StoreValues] || {})[key] = (data as any)[key];
    }
  }
  return inst;
}

export function setInitialValues(Class: ClassType, data: object) {
  initialValues.set(Class, data);
}

export function cleanup() {
  initialValues.clear();
}

function addKey(target: StoreContainer, key: string) {
  (target[StoreKeys] = target[StoreKeys] || []).push(key);
}

function getInitialValue(Class: ClassType, key: string) {
  const data = initialValues.get(Class);
  if (typeof data !== "undefined") {
    return (data as any || {})[key];
  }
}
