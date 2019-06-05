import React from "react";

interface PropertyDescriptorWithInitializer extends PropertyDescriptor {
  initializer?: () => any;
}

export const StoreSubscribe = Symbol("Store subscribe");
export const StoreNotify = Symbol("Store notify");
export const StoreUpdaters = Symbol("Store updaters");
export const StoreValues = Symbol("Store values");

export type StoreUpdater = () => any;

export interface StoreContainer {
  [StoreSubscribe]?: (updater: StoreUpdater) => any;
  [StoreNotify]?: () => any;
  [StoreUpdaters]?: Map<StoreUpdater, StoreUpdater>;
  [StoreValues]?: any;
}

export function store(target: object & StoreContainer, propertyKey: string, descriptor?: PropertyDescriptorWithInitializer) {
  const isReactComponent = target instanceof React.Component;
  const initializer = (descriptor || {}).initializer;

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

  Object.defineProperty(target, propertyKey, {
    get() {
      const container = this as StoreContainer;
      if (container[StoreValues] && container[StoreValues].hasOwnProperty(propertyKey)) {
        return container[StoreValues][propertyKey];
      } else if (initializer) {
        return (container[StoreValues] = container[StoreValues] || {})[propertyKey] = initializer();
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
  });
}
