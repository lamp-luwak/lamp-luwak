import { ClassType, Unsubscriber } from "./types";
import { subscribe as subscribeToContainer, isContainer, notify } from "~/store";
import { Unsubscribers } from "./consts";
import { isReactComponent, Component, PureComponent } from "~/driver";
import { remove } from "~/utils/array";

export function subscribe(component: Component | PureComponent, container?: object): Unsubscriber;
export function subscribe(containerTo: object, container: object): Unsubscriber;
export function subscribe<T extends ClassType<Component | PureComponent>>(Class: T): T;
export function subscribe(target: object, propertyKey: PropertyKey, descriptor?: any): any;
export function subscribe(target: any, subject?: any, descriptor?: any) {
  if (descriptor || (subject && typeof subject !== "object")) {
    const initializer = descriptor?.initializer;
    let value: any;
    return {
      get() {
        if (typeof value === "undefined" && initializer) {
          subscribe(this, value = initializer.call(this));
        }
        return value;
      },
      set(v: any) {
        if (typeof value !== "undefined") {
          throw new Error("Cannot redefine subscribed property");
        }
        subscribe(this, value = v);
      },
      configurable: false,
      enumerable: true,
    };
  }
  else if (isReactComponent(target)) {
    const component = target;
    const container = subject;

    if (!component[Unsubscribers]) {
      component[Unsubscribers] = [];
      const { componentWillUnmount } = component;
      component.componentWillUnmount = function() {
        const unsubscribers = this[Unsubscribers].slice();
        for (const unsubscriber of unsubscribers) {
          unsubscriber();
        }
        if (componentWillUnmount) {
          componentWillUnmount.call(this);
        }
      };
    }
    if (isContainer(container)) {
      const unsubscribers = component[Unsubscribers];
      const unsubscriber = subscribeToContainer(container, () => notify(component));
      unsubscribers.push(unsubscriber);
      return () => {
        remove(unsubscribers, unsubscriber);
        unsubscriber();
      }
    }
  }
  else if (isContainer(target) && isContainer(subject)) {
    return subscribeToContainer(subject, () => notify(target));
  }
  else if (typeof target === "function") {
    const Class = target;

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
