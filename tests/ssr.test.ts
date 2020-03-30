import { serialize, unserialize, register, DidUnserialize, provide, create, ssr } from "../src";
import { reset as resetDi, resolved } from "../src/di";

test("Should work serialize", () => {
  class A {
    store = {
      d: "D"
    };
  }
  register(A, "A");
  provide(A);
  expect(serialize()).toEqual([["Array", [["A", 1]]], {"d": "D"}]);
});

test("should work unserialize", () => {
  class A {
    store = "D";
  }
  register(A, "A");
  unserialize(
    [["Array", [["A", 1]]], "DD"]
  );
  expect(provide(A).store).toBe("DD");
});

test("Should work serialize/unserialize nested stores", () => {
  class R {
    store: any;
  }
  register(R, "R");
  class A {
    store = create(R);
  }
  register(A, "A");
  provide(A).store.store = [1,2,3];
  expect(serialize()).toEqual(
    [["Array", [["A", 1]]], ["R", 2], ["Array", [1, 2, 3]]]
  );
  resetDi();
  expect(provide(A).store.store).toBeUndefined();
  unserialize(
    [["Array", [["A", 1]]], ["R", 2], ["Array", [5, 6, 7]]]
  );
  expect(provide(A).store.store).toEqual([5,6,7]);
});

test("Should work DidSerialize handler", () => {
  class A {
    store = "10";
    m: string;
    [DidUnserialize]() {
      this.m = "M" + this.store;
    }
  }
  register(A, "A");
  unserialize(
    [["Array", [["A", 1]]], "11"]
  );
  expect(provide(A).m).toBe("M11");
});

test("Should throw error with invalid store data", () => {
  class B {}
  class A {
    store = new B;
  }
  register(A, "A");
  const a = provide(A);
  expect(serialize).toThrowError("Supported only registered store containers as serializable class instances");

  a.store = () => void 0;
  expect(serialize).toThrowError("Functions unsupported");
});

test("Should support standard data structures", () => {
  class A {
    store: any;
  }
  register(A, "A");

  // null
  provide(A).store = null;
  expect(serialize()).toEqual(
    [["Array", [["A", 1]]], null]
  );
  resetDi();
  expect(provide(A).store).toBeUndefined();
  unserialize(
    [["Array", [["A", 1]]], null]
  );
  expect(provide(A).store).toBe(null);

  // Array
  provide(A).store = [1,2,3];
  expect(serialize()).toEqual(
    [["Array", [["A", 1]]], ["Array", [1, 2, 3]]]
  );
  resetDi();
  expect(provide(A).store).toBeUndefined();
  unserialize(
    [["Array", [["A", 1]]], ["Array", [3, 4, 5]]]
  );
  expect(provide(A).store).toEqual([3,4,5]);

  // Date
  const date = "Sun Feb 09 2020 17:00:05 GMT+0800";
  const Time = 1581238805000;
  provide(A).store = new Date(date);
  expect(serialize()).toEqual(
    [["Array", [["A", 1]]], ["Date", Time]]
  );
  resetDi();
  expect(provide(A).store).toBeUndefined();
  unserialize(
    [["Array", [["A", 1]]], ["Date", Time]]
  );
  expect(provide(A).store).toEqual(new Date(date));

  // Map
  const map = new Map();
  map.set(1, [1, 2]);
  map.set(2, {a: 10});
  provide(A).store = map;
  expect(serialize()).toEqual(
    [["Array", [["A", 1]]], ["Map", ["Array", [
      ["Array", [1, ["Array", [1, 2]]]],
      ["Array", [2, {"a": 10}]]
    ]]]]
  );
  resetDi();
  expect(provide(A).store).toBeUndefined();
  unserialize(
    [["Array", [["A", 1]]], ["Map", ["Array", [
      ["Array", [1, ["Array", [1, 2]]]],
      ["Array", [2, {"a": 10}]]
    ]]]]
  );
  expect(provide(A).store).toEqual(new Map(map));

  // Map
  const set = new Set();
  set.add(1);
  set.add(3);
  set.add("D");
  provide(A).store = set;
  expect(serialize()).toEqual(
    [["Array", [["A", 1]]], ["Set", ["Array", [1, 3, "D"]]]]
  );
  resetDi();
  expect(provide(A).store).toBeUndefined();
  unserialize(
    [["Array", [["A", 1]]], ["Set", ["Array", [1, 3, "D"]]]]
  );
  expect(provide(A).store).toEqual(new Set(set));
  expect(provide(A).store.has("D")).toBeTruthy();
});

test("Should pass non class instance in serialize correctly", () => {
  class A { store = 10; }
  register(A, "A");
  class B {}
  provide(A);
  provide(B);
  provide(() => ({}));
  expect(serialize()).toEqual([["Array", [["A", 1]]], 10]);
});

test("Should throw non null exception", () => {
  expect(() => {
    provide(() => void 0);
  }).toThrowError("Only object supported for function return.");
});

test("Should throw unexistence class id in unserialize", () => {
  class B { store = 10; }
  register(B, "B");

  expect(() => {
    unserialize([["Array", [["A", 1]]], {}]);
  }).toThrowError("Registered class id \"A\" not found");

  expect(() => {
    unserialize(
      [["Array", [["B", 1]]], ["__INCORRECT_DATA__"]]
    );
  }).toThrowError("Registered class id \"__INCORRECT_DATA__\" not found");
});

test("Should use only one instance of entity in several stores", () => {
  let b: B;
  const DATA = [["Array", [["B", 1]]], {"a1": ["A", 2], "a2": ["A", 2]}, ["M", 3], "M"];
  class M { store: string; }
  register(M, "M");
  class A { store: M; }
  register(A, "A");
  class B {
    store: {
      a1: A;
      a2: A;
    }
  }
  register(B, "B");
  b = provide(B);
  b.store = {} as any;
  b.store.a2 = b.store.a1 = create(A);
  b.store.a1.store = create(M);
  b.store.a1.store.store = "M";
  expect(serialize()).toEqual(DATA);
  resetDi();
  unserialize(DATA);
  expect(resolved(B)).toBeTruthy();
  b = provide(B);
  expect(b.store.a1).toBe(b.store.a2);
  expect(b.store.a1.store instanceof M).toBeTruthy();
  expect(b.store.a2.store.store).toBe("M");
});

test("Should work ssr function", async () => {
  const spy = jest.fn();
  class A {
    store = "A";
  }
  register(A, "A");
  const a1 = provide(A);
  a1.store = "A1";
  const data = await ssr(() => {
    spy();
    const a2 = provide(A);
    expect(a2.store).toBe("A");
    a2.store = "DD";
  });
  expect(provide(A).store).toBe("A1");
  expect(data).toStrictEqual([["Array", [["A", 1]]], "DD"]);
});
