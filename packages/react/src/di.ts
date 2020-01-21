import { factory, Dep } from "@impress/di";
import { Component } from "react";
import { isContainer } from "./store";
import { subscribe } from "./subscribe/lib";

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
  if (target instanceof Component && isContainer(instance)) {
    subscribe(target, instance);
  }
});
