import { Dep } from "./di";
import { create } from "./store";
import { assign, instances, zone } from "./di";

export const DidUnserialize = Symbol("Did unserialize");

const regClassIndex = new Map<string, Dep>();
const regClassSearch = new Map<Dep, string>();

const refSerializedIndex = new Map<number, object>();
const refInstIndex = new Map<number, object>();
const refInstSearch = new Map<object, number>();
let refIncrementalId: number;

export async function ssr(callback: () => any) {
  let data = null;
  await zone(async () => {
    await callback();
    data = serialize();
  });
  return data;
}

export function serialize() {
  try {
    refIncrementalId = 1;
    for (const [id, Class] of regClassIndex) {
      regClassSearch.set(Class, id);
    }

    const data: any = [
      pack(instances().filter((inst) => inst && regClassSearch.has(inst.constructor))),
    ];
    for (let i = 1; i < refIncrementalId; i++) {
      data.push(refSerializedIndex.get(i));
    }

    afterSerializeUnserialize();
    return data;
  } catch(e) {
    afterSerializeUnserialize();
    throw e;
  }
}

export function unserialize(data: any) {
  try {
    for (let i = 1; i < data.length; i++) {
      refSerializedIndex.set(i, data[i]);
    }

    for (const inst of unpack(data[0])) {
      assign(inst.constructor, inst);
    }

    afterSerializeUnserialize();
  } catch (e) {
    afterSerializeUnserialize();
    throw e;
  }

}

export function reset() {
  regClassIndex.clear();
}

export function register(dep: Dep, id: string) {
  regClassIndex.set(id, dep);
  return dep;
}

function afterSerializeUnserialize() {
  regClassSearch.clear();
  refSerializedIndex.clear();
  refInstIndex.clear();
  refInstSearch.clear();
}

function factory(dep: Dep, data: any) {
  const instance = create(dep);
  instance.store = data;
  const fn = instance[DidUnserialize];
  if (fn) {
    fn.call(instance);
  }
  return instance;
}

function packRef(val: any) {
  let id = refInstSearch.get(val);
  if (!id) {
    id = refIncrementalId++;
    refInstSearch.set(val, id);
    refSerializedIndex.set(id, pack(val.store));
  }
  return id;
}

function unpackRef(dep: Dep, id: any) {
  let inst = refInstIndex.get(id);
  if (!inst) {
    inst = factory(
      dep,
      unpack(refSerializedIndex.get(id))
    );
    refInstIndex.set(id, inst!);
  }
  return inst;
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
    const id = regClassSearch.get(Ctor);
    if (typeof id !== "undefined") {
      return [id, packRef(val)];
    }
    if (Ctor !== Object) {
      throw new Error("Supported only registered store containers as serializable class instances");
    }
    const packed: any = {};
    for (const key of Object.keys(val)) {
      packed[key] = pack(val[key]);
    }
    return packed;
  } else if (typeof val === "function") {
    throw new Error("Functions unsupported");
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
    const Class = regClassIndex.get(id);
    if (typeof Class !== "undefined") {
      return unpackRef(Class, value);
    }
    throw new Error(`Registered class id "${id}" not found`);
  } else if (val && typeof val === "object") {
    const unpacked: any = {};
    for (const key of Object.keys(val)) {
      unpacked[key] = unpack(val[key]);
    }
    return unpacked;
  }
  return val;
}

