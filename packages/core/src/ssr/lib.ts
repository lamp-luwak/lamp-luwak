import { ClassType } from "../types";
import { getCurrentInstances, assign } from "../di/lib";
import { values, factory } from "../store/lib";
import state from "./state";

const { dictionary, search } = state;

export function serialize() {
  const data: any = {};
  for (const inst of getCurrentInstances()) {
    if (inst.constructor) {
      const id = search.get(inst.constructor);
      if (typeof id !== "undefined") {
        data[id] = pack(values(inst));
      }
    }
  }
  return data;
}

export function unserialize(data: any) {
  for (const key of Object.keys(data)) {
    const Class = dictionary.get(key);
    if (typeof Class !== "undefined") {
      assign(Class, unpack([key, data[key]]));
    }
  }
}

export function cleanup() {
  dictionary.clear();
  search.clear();
}

export function register(id: string, Class: ClassType) {
  dictionary.set(id, Class);
  search.set(Class, id);
}

function pack(val: any): any {
  if (Array.isArray(val)) {
    return ["Array", (val as []).map(pack)];
  } else if (val && typeof val === "object") {
    const Ctor = val.constructor;
    switch (Ctor) {
      case Date:
        return ["Date", (val as Date).getTime()];
      case Map:
        return ["Map", pack([...(val as Map<any, any>).entries()])];
      case Set:
        return ["Set", pack([...(val as Set<any>).values()])];
    }
    const id = search.get(Ctor);
    if (typeof id !== "undefined") {
      return [id, pack(values(val))];
    }
    if (Ctor !== Object) {
      throw new Error("Invalid store data");
    }
    const packed: any = {};
    for (const key of Object.keys(val)) {
      packed[key] = pack(val[key]);
    }
    return packed;
  } else if (typeof val === "function") {
    throw new Error("Invalid store data");
  }
  return val;
}

function unpack(val: any): any {
  if (Array.isArray(val)) {
    const [ id, value ] = val;
    switch (id) {
      case "Array":
        return (value as []).map(unpack);
      case "Date":
        return new Date(value);
      case "Map":
        return new Map(unpack(value));
      case "Set":
        return new Set(unpack(value));
    }
    const Class = dictionary.get(id);
    if (typeof Class !== "undefined") {
      return factory(Class as any, unpack(value));
    }
  } else if (val && typeof val === "object") {
    const unpacked: any = {};
    for (const key of Object.keys(val)) {
      unpacked[key] = unpack(val[key]);
    }
    return unpacked;
  }
  return val;
}
