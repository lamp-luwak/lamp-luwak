import { ctx } from '../ctx';

export const inject = (Service) => (Component, property) => {
  (Component.__injectedPropertyNames = Component.__injectedPropertyNames || []).push(
    property
  );
  return {
    get() {
      const instance = ctx(Service);
      Object.defineProperty(this, property, {
        value: instance,
        enumerable: false,
        configurable: false,
        writable: false
      });
      return instance;
    },
    enumerable: false,
    configurable: true
  }
};
