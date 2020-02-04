import { ClassType } from "./types";
import { make, values } from "~/store";
import { assign, getInstances } from "~/di";

const dictionary = new Map<string, ClassType>();
const searchIndex = new Map<ClassType, string>();

export const state = { dictionary, searchIndex };

export function serialize() {
  makeSearchIndex(); // The reason is the autoreload client components on the server without restart
  try {
    const data: any = {};
    for (const inst of getInstances()) {
      if (inst.constructor) {
        const id = searchIndex.get(inst.constructor);
        if (typeof id !== "undefined") {
          data[id] = pack(values(inst));
        }
      }
    }
    destroySearchIndex();
    return data;
  } catch(e) {
    destroySearchIndex();
    throw e;
  }
}

export function unserialize(data: any) {
  for (const key of Object.keys(data)) {
    const Class = dictionary.get(key);
    if (typeof Class !== "undefined") {
      assign(Class, unpack([key, data[key]]));
    }
  }
}

export function reset() {
  dictionary.clear();
  destroySearchIndex();
}

export function register(id: string, Class: ClassType) {
  dictionary.set(id, Class);
}

function makeSearchIndex() {
  for (const [id, Class] of dictionary) {
    searchIndex.set(Class, id);
  }
}

function destroySearchIndex() {
  searchIndex.clear();
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
    const id = searchIndex.get(Ctor);
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
      return make(Class as any, unpack(value));
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

