import { useMemo, useEffect } from "react";
import { useForceUpdate } from "./useForceUpdate";
import { ClassType } from "./types";

type Subscriber = (value: any, prev: any) => void;

const StoreProperty = "store";
const StoreDataProperty = Symbol("store");
const Subscribers = Symbol("subscribers");

const notify = (self: any, value: any, prevValue: any) => {
  if (!self[Subscribers]) return;
  for (const subscriber of self[Subscribers] as Subscriber[]) {
    subscriber(value, prevValue);
  }
}

const subscribe = (self: any, subscriber: Subscriber) => {
  if (!self[Subscribers]) {
    self[Subscribers] = [];
  }
  const subscribers = self[Subscribers] as Subscriber[];
  if (!subscribers.some((s) => s === subscriber)) {
    subscribers.push(subscriber);
  }
  return () => {
    self[Subscribers] = (self[Subscribers] as Subscriber[]).filter((s) => s !== subscriber);
  }
}

const make = <T>(dep: ClassType<T>, data?: any): T => {
  const inst = new dep();

  const initStorePropertyDescriptor = Object.getOwnPropertyDescriptor(inst, StoreProperty);

  Object.defineProperties(inst, {
    [StoreProperty]: {
      get() {
        if (this.hasOwnProperty(StoreDataProperty)) {
          return this[StoreDataProperty];
        } else {
          return this[StoreDataProperty] = data || (initStorePropertyDescriptor && initStorePropertyDescriptor.value);
        }
      },
      set(value: any) {
        if (value === this[StoreDataProperty]) {
          return;
        }
        const prevStoreData = this[StoreDataProperty];
        this[StoreDataProperty] = value;
        notify(this, value, prevStoreData);
      }
    },
  })

  return inst;
}

const depInstances = new Map<ClassType, any>();
const provide = (dep: ClassType) => {
  let inst = depInstances.get(dep);
  if (!inst) {
    depInstances.set(
      dep,
      inst = make(dep)
    );
  }
  return inst;
}

export const useProvide = (dep: ClassType) => {
  const forceUpdate = useForceUpdate();
  const instance = useMemo(() => provide(dep), [dep]);
  useEffect(() => subscribe(instance, forceUpdate), [instance, forceUpdate]);
  return instance;
};
