import { useMemo, useEffect } from "react";
import { useForceUpdate } from "./useForceUpdate";
import { ClassType } from "./types";
import { dispatch, subscribe } from "./subscriber";

const StoreProperty = "store";
const StoreDataProperty = Symbol("store");

export const make = <T>(dep: ClassType<T>, ...args: any[]): T => {
  const inst = new dep(...args);
  const initStorePropertyDescriptor = Object.getOwnPropertyDescriptor(inst, StoreProperty);

  Object.defineProperties(inst, {
    [StoreProperty]: {
      get() {
        if (this.hasOwnProperty(StoreDataProperty)) {
          return this[StoreDataProperty];
        } else {
          return this[StoreDataProperty] = initStorePropertyDescriptor && initStorePropertyDescriptor.value;
        }
      },
      set(value: any) {
        if (value === this[StoreDataProperty]) {
          return;
        }
        const prevStoreData = this[StoreDataProperty];
        this[StoreDataProperty] = value;
        dispatch(this, value, prevStoreData);
      }
    },
  })

  return inst;
}

const depInstances = new Map<ClassType, any>();
export const provide = <T>(dep: ClassType<T>): T => {
  let inst = depInstances.get(dep);
  if (!inst) {
    depInstances.set(
      dep,
      inst = make(dep)
    );
  }
  return inst;
}

export const useProvide = <T>(dep: ClassType<T>): T => {
  const forceUpdate = useForceUpdate();
  const instance = useMemo(() => provide(dep), [dep]);
  useEffect(
    () => subscribe(instance, forceUpdate),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [instance]
  );
  return instance;
};
