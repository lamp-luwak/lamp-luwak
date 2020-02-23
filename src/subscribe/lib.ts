import { ClassType, Unsubscriber, Container  } from "./types";
import { subscribe as storeSubscribe, isContainer, notify } from "~/store";
import { Container as StoreContainer } from "~/store/types";
import { Unsubscribers, Values } from "./consts";
import { isReactComponent, Component, PureComponent } from "~/driver";
import { remove } from "~/utils/array";

export function subscribe(component: Component | PureComponent, container?: StoreContainer): Unsubscriber;
export function subscribe(containerTo: StoreContainer, container: StoreContainer): Unsubscriber;
export function subscribe<T extends ClassType<Component | PureComponent>>(Class: T): T;
export function subscribe(target: object, propertyKey: PropertyKey, descriptor?: any): any;
export function subscribe(target: any, subject?: any, descriptor?: any) {
  if (descriptor || (subject && typeof subject !== "object")) {
    const propertyKey = subject;
    const initializer = descriptor?.initializer;
    return {
      get(this: Container) {
        const values = this[Values] = this[Values] || {};
        if (!values.hasOwnProperty(propertyKey) && initializer) {
          subscribe(this, values[propertyKey] = initializer.call(this));
        }
        return values[propertyKey];
      },
      set(this: Container, value: any) {
        const values = this[Values] = this[Values] || {};
        if (values.hasOwnProperty(propertyKey)) {
          throw new Error("Cannot redefine subscribed property");
        }
        subscribe(this, values[propertyKey] = value);
      },
      configurable: false,
      enumerable: true,
    };
  }
  else if (isReactComponent(target)) {
    if (!target[Unsubscribers]) {
      target[Unsubscribers] = [];
      const { componentWillUnmount } = target;
      target.componentWillUnmount = function() {
        const unsubscribers = this[Unsubscribers].slice();
        for (const unsubscriber of unsubscribers) {
          unsubscriber();
        }
        if (componentWillUnmount) {
          componentWillUnmount.call(this);
        }
      };
    }
    if (subject && typeof subject === "object") {
      const unsubscribers = target[Unsubscribers];
      const unsubscriber = storeSubscribe(subject, () => notify(target));
      unsubscribers.push(unsubscriber);
      return () => {
        remove(unsubscribers, unsubscriber);
        unsubscriber();
      }
    }
  }
  else if (target && typeof target === "object" && subject && typeof subject === "object") {
    return storeSubscribe(subject, () => notify(target));
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
