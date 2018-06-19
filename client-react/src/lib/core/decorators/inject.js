
import { addInjectInfo } from '../injectInfo';

export const inject = (Service) => {
  return (Component, property) => {
    addInjectInfo(Component.constructor, property, Service);
    return {
      value: undefined,
      enumerable: false,
      configurable: true,
      writable: true
    }
  }
};
