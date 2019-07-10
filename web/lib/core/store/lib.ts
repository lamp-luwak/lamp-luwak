import React from "react";
import {
  StoreUpdaters,
  StoreKeys,
  StoreValues,
  StoreContainer,
  StoreUpdater,
} from "./interfaces";
import { getInitialValue } from "../ssr/lib";

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

export function addKey(target: StoreContainer, key: string) {
  (target[StoreKeys] = target[StoreKeys] || []).push(key);
}

export function isStoreContainer(target: StoreContainer) {
  return target[StoreKeys] && target[StoreKeys]!.length;
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

export function unserialize(target: StoreContainer, data: object) {
  for (const key of target[StoreKeys] || []) {
    if (data.hasOwnProperty(key)) {
      (target[StoreValues] = target[StoreValues] || {})[key] = (data as any)[key];
    }
  }
}
