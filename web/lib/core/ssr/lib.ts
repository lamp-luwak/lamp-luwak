import { resolve } from "../provide/lib";
import {
  isStoreContainer,
  serialize as storeSerialize,
} from "../store/lib";
import { ClassType } from "./interfaces";

export const dictionary = new Map<ClassType, string>();
export const initialState = new Map<string, any>();

export function register(id: string, Class: ClassType) {
  dictionary.set(Class, id);
}

export function serialize() {
  const data: any = {};
  for (const [ Class, id ] of dictionary) {
    const instance = resolve(Class);
    if (isStoreContainer(instance)) {
      data[id] = storeSerialize(instance);
    }
  }
  console.log("SERIALIZE", data);
  return data;
}

export function setInitialState(data: object) {
  for (const key of Object.keys(data)) {
    initialState.set(key, (data as any)[key]);
  }
}

export function getInitialValue(Class: ClassType, key: string) {
  const id = dictionary.get(Class);
  if (typeof id !== "undefined") {
    const state = initialState.get(id);
    if (typeof state !== "undefined") {
      return (state || {})[key];
    }
  }
}

export function cleanup() {
  dictionary.clear();
  initialState.clear();
}
