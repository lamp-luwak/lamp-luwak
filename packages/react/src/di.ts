import { factory, Dep } from "@impress/di";
import { isContainer } from "./store";
import { subscribe } from "./subscribe/lib";
import { isReactComponent } from "./utils";

export const {
  zone,
  provide,
  resolve,
  override,
  assign,
  cleanup,
  reset,
  getInstances
} = factory((target: object, instance: Dep) => {
  if (isReactComponent(target) && isContainer(instance)) {
    subscribe(target, instance);
  }
});
