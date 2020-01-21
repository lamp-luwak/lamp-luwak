import { factory } from "@impress/store";
import React from "react";

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
  if (target instanceof React.Component) {
    target.forceUpdate();
  }
});
