import { Dep } from "./di";
import { dispatch } from "./subscriber";

const StoreProperty = "store";
export const StoreDataProperty = Symbol("store");
export const Factory = Symbol("factory");

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
      if (value === this[StoreProperty]) {
        return;
      }
      const prevStoreData = this[StoreProperty];
      this[StoreDataProperty] = value;
      dispatch(this, value, prevStoreData);
    }
  });

  return inst;
}

export function create<T>(dep: Dep<T>, ...args: any[]): T {
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
    inst[Factory] = dep;
  }
  return configure(inst);
}
