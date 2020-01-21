import { factory, Dep } from "@impress/di";
import { Component } from "react";
import { isStoreContainer } from "../store/lib";
import { subscribe } from "../subscribe/lib";

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
  if (target instanceof Component && isStoreContainer(instance)) {
    subscribe(target, instance);
  }
});
