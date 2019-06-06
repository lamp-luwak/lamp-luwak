import { ProvideContainer, ProvideKeys } from "./interfaces";

export const instances = new Map();

export function addKey(target: ProvideContainer, key: string) {
  (target[ProvideKeys] = getKeys(target)).push(key);
}

export function getKeys(target: ProvideContainer) {
  return target[ProvideKeys] || [];
}

export function resolve<T>(Class: new (...args: any) => T): T {
  let instance = instances.get(Class);
  if (!instance) {
    instances.set(Class, (instance = new Class()));
  }
  return instance;
}

export function reset() {
  instances.clear();
}
