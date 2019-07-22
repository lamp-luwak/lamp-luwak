import { ClassType } from "../types";
import { resolve } from "../di/lib";
import { setInitialValues, serialize as serializeStoreContainer } from "../store/lib";
import state from "./state";

const { dictionary } = state;

/**
 * Class decorator
 */
export function ssr<T extends ClassType>(id: string) {
  return (Class: T) => {
    register(id, Class);
    return Class;
  };
}

export function serialize() {
  const data: any = {};
  for (const [ id, Class ] of dictionary) {
    data[id] = serializeStoreContainer(resolve(Class));
  }
  return data;
}

export function setInitialState(data: object) {
  for (const key of Object.keys(data)) {
    const Class = dictionary.get(key);
    if (typeof Class !== "undefined") {
      setInitialValues(Class, (data as any)[key]);
    }
  }
}

export function reset() {
  dictionary.clear();
}

export function register(id: string, Class: ClassType) {
  dictionary.set(id, Class);
}
