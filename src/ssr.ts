import { Dep, provide } from "./di";
import { create } from "./store";
import { instances as diInstances, zone } from "./di";

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

export function serialize(instances?: any[]) {
  try {
    refIncrementalId = 1;
    for (const [id, Class] of regClassIndex) {
      regClassSearch.set(Class, id);
    }
    const data: any = [
      (instances || diInstances())
        .filter((inst) => inst && regClassSearch.has(inst.constructor))
        .map(pack),
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
  if (!data) return;
  try {
    for (let i = 1; i < data.length; i++) {
      refSerializedIndex.set(i, data[i]);
    }
    const instances = data[0].map((ref: any) => unpack(ref, true));

    afterSerializeUnserialize();
    return instances;
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

function factory(dep: Dep, data: any, isService: boolean) {
  const inst = isService
    ? provide(dep)
    : create(dep);
  inst.store = data;
  return inst;
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

function unpackRef(dep: Dep, id: any, isService: boolean) {
  let inst = refInstIndex.get(id);
  if (!inst) {
    inst = factory(
      dep,
      unpack(refSerializedIndex.get(id)),
      isService
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

function unpack(val: any, isService = false): any {
  if (Array.isArray(val)) {
    const [ id, value ] = val;
    switch (id) {
      case "Array":
        return (value as []).map((v) => unpack(v));
      case "Date":
        return new Date(value);
      case "Map":
        return new Map(unpack(value));
      case "Set":
        return new Set(unpack(value));
    }
    const Class = regClassIndex.get(id);
    if (typeof Class !== "undefined") {
      return unpackRef(Class, value, isService);
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

