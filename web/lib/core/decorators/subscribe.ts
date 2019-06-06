import { Component } from "react";
import { ProvideContainer } from "../provide/interfaces";
import { getKeys as getProvideKeys } from "../provide/lib";
import { subscribe as storeSubscribe, isStoreContainer } from "../store/lib";

export const StoreUnsubscribers = Symbol("Store unsubscribers");

export function subscribe<T extends new(...args: any[]) => Component>(Class: T) {
  return class extends Class {
    public static displayName = (Class as any).displayName || Class.name;

    private [StoreUnsubscribers]: any[];

    [key: string]: any;

    constructor(...args: any[]) {
      super(...args);

      const unsubscribers = (this[StoreUnsubscribers] = this[StoreUnsubscribers] || []);
      const update = this.forceUpdate.bind(this);
      const keys = getProvideKeys(this as ProvideContainer);

      if (keys) {
        for (const key of keys) {
          if (isStoreContainer(this[key])) {
            unsubscribers.push(storeSubscribe(this[key], update));
          }
        }
      }

      const props = args.shift();

      for (const name of Object.keys(props)) {
        if (isStoreContainer(props[name])) {
          unsubscribers.push(storeSubscribe(props[name], update));
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
