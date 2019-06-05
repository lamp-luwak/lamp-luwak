import { Component } from "react";
import { ProvidedPropertyNames } from "./provide";
import { StoreSubscribe } from "./store";

export const StoreUnsubscribers = Symbol("Store unsubscribers");

export function subscribe<T extends new(...args: any[]) => Component>(Comp: T) {
  return class extends Comp {
    public static displayName =
      (Comp as any).displayName || Comp.name;

    private [StoreUnsubscribers]: any[];
    private [ProvidedPropertyNames]?: string[];

    [key: string]: any;

    constructor(...args: any[]) {
      super(...args);

      const unsubscribers = (this[StoreUnsubscribers] = this[StoreUnsubscribers] || []);
      const update = this.forceUpdate.bind(this);
      const names = this[ProvidedPropertyNames];

      if (names) {
        for (const name of names) {
          if (this[name][StoreSubscribe]) {
            unsubscribers.push(this[name][StoreSubscribe](update));
          }
        }
      }

      const props = args[ 0 ];

      for (const name of Object.keys(props)) {
        if (props[name][StoreSubscribe]) {
          unsubscribers.push(props[name][StoreSubscribe](update));
        }
      }
    }

    public componentWillUnmount() {
      if (typeof super.componentWillUnmount !== "undefined") {
        super.componentWillUnmount();
      }
      for (const unsubscriber of this[StoreUnsubscribers]) {
        unsubscriber();
      }
    }
  };
}
