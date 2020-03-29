import { ClassType } from "./types";
import { dispatch } from "./subscriber";

const StoreProperty = "store";
export const StoreDataProperty = Symbol("store");

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
