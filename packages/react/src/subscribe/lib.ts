import { Component } from "react";
import { ClassType } from "../types";
import {
  subscribe as subscribeToContainer,
  isContainer,
  notify
} from "../store/lib";
import { Unsubscribers } from "./consts";

export function subscribe(component: Component, container: object): void;
export function subscribe<T extends ClassType<Component>>(Class: T): T;
export function subscribe(ClassOrComponent: any, container?: object) {
  if (ClassOrComponent instanceof Component) {
    const component = ClassOrComponent as any;
    if (!component[Unsubscribers]) {
      component[Unsubscribers] = [];
      const { componentWillUnmount } = component;
      component.componentWillUnmount = function() {
        for (const unsubscriber of this[Unsubscribers]) {
          unsubscriber();
        }
        if (componentWillUnmount) {
          componentWillUnmount();
        }
      };
    }
    if (container && isContainer(container)) {
      component[Unsubscribers].push(
        subscribeToContainer(container, () => {
          notify(component);
        }),
      );
    }
  }
  if (typeof ClassOrComponent === "function") {
    const Class = ClassOrComponent;

    return class extends Class {
      public static displayName = Class.displayName || Class.name;

      constructor(props: any, context?: any) {
        super(props, context);

        for (const name of Object.keys(props)) {
          if (isContainer(props[name])) {
            subscribe(this as any, props[name]);
          }
        }
      }
    };
  }
}
