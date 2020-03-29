import { ClassType } from "./types";
import { make } from "./store";

const depInstances = new Map<ClassType, any>();
export const provide = <T>(dep: ClassType<T>): T => {
  let inst = depInstances.get(dep);
  if (!inst) {
    depInstances.set(
      dep,
      inst = make(dep)
    );
  }
  return inst;
}
