import { ClassType } from "../types";
import { getCurrentInstances, assign } from "../di/lib";
import { serialize as storeSerialize, unserialize as storeUnserialize } from "../store/lib";
import state from "./state";

const { dictionary, search } = state;

export function serialize() {
  const data: any = {};
  for (const inst of getCurrentInstances()) {
    if (inst.constructor) {
      const id = search.get(inst.constructor);
      if (typeof id !== "undefined") {
        data[id] = storeSerialize(inst);
      }
    }
  }
  return data;
}

export function unserialize(data: object) {
  for (const key of Object.keys(data)) {
    const Class = dictionary.get(key);
    if (typeof Class !== "undefined") {
      assign(Class, storeUnserialize(Class as any, (data as any)[key]));
    }
  }
}

export function reset() {
  dictionary.clear();
  search.clear();
}

export function register(id: string, Class: ClassType) {
  dictionary.set(id, Class);
  search.set(Class, id);
}
