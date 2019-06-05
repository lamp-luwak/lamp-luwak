import "reflect-metadata";
import React from "react";

export const ProvidedPropertyNames = Symbol("Provided property names");

export const instances = new Map();

interface ProvideContainer {
  [ProvidedPropertyNames]?: string[];
}

export function provide(target: object & ProvideContainer, propertyKey: string): any {
  const isReactComponent = target instanceof React.Component;

  if (isReactComponent) {
    target[ProvidedPropertyNames] = target[ProvidedPropertyNames] || [];
    target[ProvidedPropertyNames]!.push(propertyKey);
  }

  const Class = Reflect.getMetadata("design:type", target, propertyKey);
  return {
    get() {
      let instance = instances.get(Class);
      if (!instance) {
        instances.set(Class, (instance = new Class()));
      }

      Object.defineProperty(this, propertyKey, {
        value: instance,
        enumerable: true,
        configurable: false,
        writable: false,
      });
      return instance;
    },
    enumerable: true,
    configurable: true,
  };
}
