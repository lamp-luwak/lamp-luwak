import { ClassType } from "./types";
import { subscribe as subscribeToContainer, isContainer, notify } from "~/store";
import { Unsubscribers } from "./consts";
import { isReactComponent, Component, PureComponent } from "~/driver";

export function subscribe(component: Component | PureComponent, container?: object): void;
export function subscribe<T extends ClassType<Component | PureComponent>>(Class: T): T;
export function subscribe(ClassOrComponent: any, container?: object) {
  if (isReactComponent(ClassOrComponent)) {
    const component = ClassOrComponent;
    if (!component[Unsubscribers]) {
      component[Unsubscribers] = [];
      const { componentWillUnmount } = component;
      component.componentWillUnmount = function() {
        for (const unsubscriber of this[Unsubscribers]) {
          unsubscriber();
        }
        if (componentWillUnmount) {
          componentWillUnmount.call(this);
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
