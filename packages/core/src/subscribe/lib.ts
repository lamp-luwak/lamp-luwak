import { Component } from "react";
import { ClassType } from "../types";
import { StoreContainer } from "../store/types";
import { subscribe as storeSubscribe, isStoreContainer, notify } from "../store/lib";

export const Unsubscribers = Symbol("Unsubscribers");
export const UnsubscribersRegistered = Symbol("Unsubscribers registered");

export function subscribe(component: Component, storeContainer: StoreContainer): void;
export function subscribe<T extends ClassType<Component>>(Class: T): T;
export function subscribe(ClassOrComponent: any, storeContainer?: StoreContainer) {
  if (ClassOrComponent instanceof Component) {
    const component = ClassOrComponent as any;
    if (!component[UnsubscribersRegistered]) {
      component[UnsubscribersRegistered] = true;
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
    if (storeContainer && isStoreContainer(storeContainer)) {
      component[Unsubscribers].push(
        storeSubscribe(storeContainer, () => {
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
          if (isStoreContainer(props[name])) {
            subscribe(this as any, props[name]);
          }
        }
      }
    };
  }
}
