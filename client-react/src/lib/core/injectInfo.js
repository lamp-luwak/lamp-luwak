
import { injectInfoKey } from './keys';

export const addInjectInfo = (ctor, property, Service) => {
  const info = ctor[injectInfoKey] = ctor[injectInfoKey] || {};
  info[property] = Service;
}

export const getInjectInfo = (ctor) => {
  return ctor[injectInfoKey];
}
