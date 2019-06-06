
import { instances } from "./decorators/provide";

export function resolve<T>(Class: new (...args: any) => T): T {
  let instance = instances.get(Class);
  if (!instance) {
    instances.set(Class, (instance = new Class()));
  }
  return instance;
}
