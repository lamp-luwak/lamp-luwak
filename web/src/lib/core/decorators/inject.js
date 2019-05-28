// @flow
import React from 'react';

const store = new Map();

export const inject = (Ctor) => (Prototype, property) => {
  if (Prototype instanceof React.Component) {
    (Prototype.__injectedPropertyNames = Prototype.__injectedPropertyNames || []).push(
      property
    );
  }

  return {
    get() {
      let instance = store.get(Ctor);
      if (!instance) {
        store.set(Ctor, instance = new Ctor());
      }

      Object.defineProperty(this, property, {
        value: instance,
        enumerable: true,
        configurable: false,
        writable: false
      });
      return instance;
    },
    enumerable: true,
    configurable: true
  }
};
