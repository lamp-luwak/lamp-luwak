import { PropertyKey } from "~/types";

export function seal(target: any, propertyKey: PropertyKey, value: any) {
  Object.defineProperty(target, propertyKey, {
    value,
    enumerable: true,
    configurable: false,
    writable: false,
  });
  return value;
}
