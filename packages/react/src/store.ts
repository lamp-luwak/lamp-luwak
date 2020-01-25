import { factory } from "@impress/store";
import { isReactComponent } from "./utils";

export const {
  store,
  subscribe,
  isContainer,
  values,
  make,
  notify,
  setInitialValues,
  unsetInitialValues,
  cleanup,
} = factory((target: object) => {
  if (isReactComponent(target)) {
    (target as any).forceUpdate();
  }
});
