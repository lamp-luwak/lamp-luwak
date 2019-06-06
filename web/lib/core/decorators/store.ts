import { dictionary } from "./ssr";
import { state } from "../init";
import React from "react";

interface PropertyDescriptorWithInitializer extends PropertyDescriptor {
  initializer?: () => any;
}

export const StoreSubscribe = Symbol("Store subscribe");
export const StoreNotify = Symbol("Store notify");
export const StoreUpdaters = Symbol("Store updaters");
export const StoreValues = Symbol("Store values");
export const StorePropertyNames = Symbol("Store property names");

export type StoreUpdater = () => any;

export interface StoreContainer {
  [StoreSubscribe]?: (updater: StoreUpdater) => any;
  [StoreNotify]?: () => any;
  [StoreUpdaters]?: Map<StoreUpdater, StoreUpdater>;
  [StoreValues]?: any;
  [StorePropertyNames]?: string[];
}

function getInitValue(target: any, propertyKey: string) {
  const Class = target.prototype.constructor;
  const id = dictionary.get(Class);
  if (typeof id !== "undefined") {
    const data = state.get(id);
    if (typeof data !== "undefined") {
      return data[propertyKey];
    }
  }
}

export function store(target: object & StoreContainer, propertyKey: string, descriptor?: PropertyDescriptorWithInitializer): any {
  const isReactComponent = target instanceof React.Component;
  const initializer = (descriptor || {}).initializer;

  if (!isReactComponent) {
    target[StorePropertyNames] = target[StorePropertyNames] || [];
    target[StorePropertyNames]!.push(propertyKey);
  }

  if (!target[StoreSubscribe] && !isReactComponent) {
    Object.assign(target, {
      [StoreSubscribe](updater: StoreUpdater) {
        const container = this as StoreContainer;
        const updaters = container[StoreUpdaters] = container[StoreUpdaters] || new Map<StoreUpdater, StoreUpdater>();
        updaters.set(updater, updater);
        return () => {
          updaters.delete(updater);
        };
      },
      [StoreNotify]() {
        const container = this as StoreContainer;
        if (container[StoreUpdaters]) {
          for (const [updater] of container[StoreUpdaters]!) {
            updater();
          }
        }
      },
    });
  }

  return {
    get() {
      const container = this as StoreContainer;
      if (container[StoreValues] && container[StoreValues].hasOwnProperty(propertyKey)) {
        return container[StoreValues][propertyKey];
      } else {
        const initValue = getInitValue(this, propertyKey);
        return (container[StoreValues] = container[StoreValues] || {})[propertyKey] = (typeof initValue !== "undefined")
          ? initValue
          : initializer && initializer();
      }
    },
    set(value: any) {
      const container = this as StoreContainer;
      const values = container[StoreValues] = container[StoreValues] || {};
      if (values[propertyKey] !== value) {
        values[propertyKey] = value;

        if (!isReactComponent) {
          container[StoreNotify]!();
        } else {
          (container as React.Component).forceUpdate();
        }
      }
    },
    configurable: false,
    enumerable: true,
  };
}
