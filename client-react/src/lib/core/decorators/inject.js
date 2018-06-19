import React from 'react';

export const inject = (Ctor) => (Prototype, property) => {
  if (Prototype instanceof React.Component) {
    (Prototype.__injectedPropertyNames = Prototype.__injectedPropertyNames || []).push(
      property
    );
  }

  return {
    get() {
      if (!this.ctx) {
        throw new Error(`Instance of ${this.constructor.name} doesn't have ctx.`);
      }
      const instance = this.ctx(Ctor);
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
