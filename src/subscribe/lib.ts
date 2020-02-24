import { ClassType, Unsubscriber } from "./types";
import { subscribe as storeSubscribe, notify } from "~/store";
import { Container as StoreContainer } from "~/store/types";
import { Keys as StoreKeys } from "~/store/consts";
import { Unsubscribers, HasSubscribes, ShouldSubscribe, PropUnsubscribers } from "./consts";
import { isReactComponent, Component, PureComponent } from "~/driver";
import { remove } from "~/utils/array";
import { seal } from "~/utils/property";

export function subscribe(component: Component | PureComponent, container?: StoreContainer): Unsubscriber;
export function subscribe(containerTo: StoreContainer, container: StoreContainer): Unsubscriber;
export function subscribe<T extends ClassType<Component | PureComponent>>(Class: T): T;
export function subscribe(target: object, propertyKey: PropertyKey, descriptor?: any): any;
export function subscribe(target: any, subject?: any, descriptor?: any) {
  if (descriptor || (subject && typeof subject !== "object")) {
    const propertyKey = subject;
    const initializer = descriptor?.initializer;
    target[HasSubscribes] = true;
    return {
      get() {
        const value = initializer && initializer.call(this);
        subscribe(this, value);
        return seal(this, propertyKey, value);
      },
      set(value: any) {
        subscribe(this, value);
        seal(this, propertyKey, value);
      },
      configurable: true,
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
    if (isShouldSubscribe(container)) {
      const unsubscribers = component[Unsubscribers];
      const unsubscriber = storeSubscribe(container, () => notify(component));
      unsubscribers.push(unsubscriber);
      return () => {
        remove(unsubscribers, unsubscriber);
        unsubscriber();
      }
    }
  }
  else if (target && typeof target === "object" && isShouldSubscribe(subject)) {
    target[HasSubscribes] = true;
    return storeSubscribe(subject, () => notify(target));
  }
  else if (typeof target === "function") {
    const Class = target;

    return class extends Class {
      public static displayName = Class.displayName || Class.name;

      [PropUnsubscribers] = {} as any;

      constructor(props: any, context?: any) {
        super(props, context);

        for (const key of Object.keys(props)) {
          if (isShouldSubscribe(props[key])) {
            this[PropUnsubscribers][key] = subscribe(this, props[key]);
          }
        }
      }

      componentDidUpdate(prevProps: any) {
        if (super.componentDidUpdate) {
          super.componentDidUpdate(prevProps);
        }

        if(this.props !== prevProps) {
          const keys = Object.keys(this[PropUnsubscribers]);
          for (const key of keys) {
            if (this.props[key] !== prevProps[key]) {
              this[PropUnsubscribers][key]();
              this[PropUnsubscribers][key] = subscribe(this, this.props[key]);
            }
          }
        }
      }
    };
  }
}

export function isShouldSubscribe(target: any) {
  return target && (
    target[StoreKeys] || target[HasSubscribes] || (
      typeof target[ShouldSubscribe] === "function" && target[ShouldSubscribe]() === true
    )
  );
}
