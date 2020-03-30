import { ClassType, FuncType } from "./types";
import { dispatch } from "./subscriber";

const StoreProperty = "store";
export const StoreDataProperty = Symbol("store");

function configure(inst: any) {
  const initStorePropertyDescriptor = Object.getOwnPropertyDescriptor(inst, StoreProperty);

  Object.defineProperty(inst, StoreProperty, {
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
  });

  return inst;
}

export function create<T>(dep: ClassType<T>, ...args: any[]): T;
export function create<T>(dep: FuncType<T>, ...args: any[]): T;
export function create(dep: any, ...args: any[]) {
  let inst;
  if (typeof dep !== "function") {
    throw new Error("Only function and class supported");
  }
  if (typeof dep.prototype !== "undefined") {
    inst = new (dep as new (...args: any[]) => any)(...args);
  } else {
    inst = (dep as (...args: any[]) => any)(...args);
    if (!inst || typeof inst !== "object") {
      throw new Error("Only object supported for function return.");
    }
  }
  return configure(inst);
}
