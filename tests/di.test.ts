import {
  service,
  resolved,
  override,
  assign,
  cleanup,
  reset,
  zone,
  getZoneId,
  getInstances,
  getInternalState,
  RootZoneId
} from "../src/di";

const { instancesMap, overridePairs, zoneTreeIndex } = getInternalState();

test("Should be only one instance of provided class", () => {
  class A {
    value = "value";
  }
  class B {
    a = service(A);
  }
  class C {
    a = service(A);
  }
  const b = new B();
  const c = new C();
  expect(b.a.value).toBe("value");
  expect(c.a).toBe(b.a);
  expect(instancesMap[RootZoneId].size).toBe(1);
});

test("Should work provide function", () => {
  class A {}
  class B {}
  class C {
    a = service(A);
    b = service(B);
  }
  const c = new C();
  expect(service(A)).toBe(c.a);
  const [a, b] = [A, B].map(service);
  expect(a).toBe(c.a);
  expect(b).toBe(c.b);
});

test("Should work resolved function", () => {
  class A {}
  class B {}
  class C {
    a = service(A);
    b = service(B);
  }
  expect(resolved(A)).toBeFalsy();
  expect(resolved(B)).toBeFalsy();
  const c = new C();
  expect(resolved(A)).toBeTruthy();
  expect(resolved(B)).toBeTruthy();
});

test("Should work with override", () => {
  class A {}
  class A2 extends A {}
  class B {
    a = service(A);
  }
  override(A, A2);
  expect(overridePairs[RootZoneId].size).toBe(1);
  expect(service(B).a).toBeInstanceOf(A2);
});

test("Should cache override", () => {
  class A {}
  class A2 extends A {}
  class A3 extends A2 {}
  class B {
    a = service(A);
  }
  override(A, A2);
  override(A2, A3);
  expect(overridePairs[RootZoneId].size).toBe(2);
  expect(service(B).a).toBeInstanceOf(A3);
  expect(instancesMap[RootZoneId].get(A)).toBeInstanceOf(A3);
  expect(instancesMap[RootZoneId].get(A2)).toBeInstanceOf(A3);
});

test("Should work cleanup", () => {
  class A {}
  class B {}
  const m = {};
  expect(service(A)).toBeInstanceOf(A);
  assign(B, m);
  expect(service(B)).toBe(m);
  expect(instancesMap[RootZoneId].size).toBe(2);
  cleanup();
  expect(instancesMap[RootZoneId]).toBeUndefined();
});

test("Should work reset", () => {
  class A {}
  class A2 extends A {}
  override(A, A2);
  expect(service(A)).toBe(service(A2));
  expect(instancesMap[RootZoneId].size).toBe(2);
  expect(overridePairs[RootZoneId].size).toBe(1);
  reset();
  expect(instancesMap[RootZoneId]).toBeUndefined();
  expect(overridePairs[RootZoneId]).toBeUndefined();
});

test("Should work assign", () => {
  class A {}
  class B {}
  class E {}
  const j = {};
  override(A, B);
  assign(A, j);
  assign(E, 10);
  expect(service(E)).toBe(10);
  const [a, b] = [A, B].map(service);
  expect(a).toBe(j);
  expect(b).toBe(j);
});

test("Should throw error nested zone", async () => {
  await expect(zone(async () => {
    await zone(() => void 0);
  })).rejects.toThrow("Nested zone is not available");
});

test("Should work zone with local override", async () => {
  class A {}
  class B extends A {}
  await zone(() => {
    override(A, B);
    const a = service(A);
    expect(a).toBeInstanceOf(B);
  });
  const a = service(A);
  expect(a).toBeInstanceOf(A);
  expect(a).not.toBeInstanceOf(B);
});

test("Should throw error in zone", async () => {
  await expect(zone(() => { throw new Error("A"); })).rejects.toThrow("A");
});

test("Should work getting current zone id", async () => {
  expect(getZoneId()).toBe(RootZoneId);
  let z1 = RootZoneId;
  await zone(() => { z1 = getZoneId() });
  expect(z1).not.toBe(RootZoneId);
  let z2 = RootZoneId;
  await zone(() => { z2 = getZoneId() });
  expect(z2).not.toBe(RootZoneId);
  expect(z2).not.toBe(z1);
});

test("Should destroy async context in zone", async () => {
  const zoneId = getZoneId();
  let z1 = RootZoneId;
  const spy = jest.fn();
  await zone(() => {
    z1 = getZoneId();
    expect(zoneTreeIndex[z1]).toBe(z1);
    spy();
  });
  expect(z1).not.toBe(RootZoneId);
  const currentZoneId = getZoneId();
  expect(currentZoneId).toBe(zoneId);
  expect(zoneId).not.toBe(z1);
  await new Promise(setTimeout as any);
  await new Promise(setTimeout as any);
  await new Promise(setTimeout as any);
  expect(zoneTreeIndex[z1]).toBeUndefined();
  expect(spy).toBeCalled();
});

test("Should pass zone code in browser", async () => {
  const spy = jest.fn();
  const _browser = process.browser;
  (process as any).browser = true;
  await zone(() => {
    expect(getZoneId()).toBe(RootZoneId);
    spy();
  });
  expect(spy).toBeCalled();
  (process as any).browser = _browser;
});

test("Should throw error when circular dependency detected", () => {
  class A {
    f = service(func);
    action() { return 0; }
    constructor() {
      this.f.action();
    }
  }
  function func() {
    return service(A);
  }
  expect(() => service(A)).toThrow("Circular dependency detected");
});

test("Should get instances list correctly", async () => {
  const spy = jest.fn();
  class A {}
  class B {}
  expect(getInstances().length).toBe(0);
  const a = service(A);
  expect(getInstances()).toContain(a);
  await zone(() => {
    expect(getInstances().length).toBe(0);
    const [a, b] = [A, B].map(service);
    expect(getInstances().length).toBe(2);
    expect(getInstances()).toContain(a);
    expect(getInstances()).toContain(b);
    spy();
  });
  expect(spy).toBeCalled();
  expect(getInstances().length).toBe(1);
  expect(getInstances()).toContain(a);
  const b = service(B);
  expect(getInstances().length).toBe(2);
  expect(getInstances()).toContain(b);
});
