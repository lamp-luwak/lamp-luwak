
import { injectInfoKey } from './keys';

export const addInjectInfo = (Ctor, property, Service) => {
  const info = Ctor[injectInfoKey] = Ctor[injectInfoKey] || {};
  info[property] = Service;
}

export const getInjectInfo = (Ctor) => (
  Ctor[injectInfoKey]
)
