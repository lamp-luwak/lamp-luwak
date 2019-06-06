import "reflect-metadata";
import { ProvideContainer } from "./interfaces";
import { addKey, resolve } from "./lib";

export function provide(target: object & ProvideContainer, propertyKey: string): any {
  const Class = Reflect.getMetadata("design:type", target, propertyKey);

  addKey(target, propertyKey);
  return {
    get() {
      const instance = resolve(Class);
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
