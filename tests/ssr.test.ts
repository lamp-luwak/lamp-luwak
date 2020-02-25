import { serialize, unserialize, register, DidUnserialize } from "~/ssr";
import { reset as resetDi, resolved } from "~/di";
import { store, resolve } from "~/.";

test("Should work serialize", () => {
  class A {
    @store d = "D";
  }
  register("A", A);
  resolve(A);
  expect(serialize()).toEqual([["Array", [["A", 1]]], {"d": "D"}]);
});

test("should work unserialize", () => {
  class A {
    @store d = "D";
  }
  register("A", A);
  unserialize(
    [["Array", [["A", 1]]], {d: "DD"}]
  );
  expect(resolve(A).d).toBe("DD");
});

test("Should work serialize/unserialize nested stores", () => {
  class R {
    @store m: any;
  }
  register("R", R);
  class A {
    @store d = new R();
  }
  register("A", A);
  resolve(A).d.m = [1,2,3];
  expect(serialize()).toEqual(
    [["Array", [["A", 1]]], {"d": ["R", 2]}, {"m": ["Array", [1, 2, 3]]}]
  );
  resetDi();
  expect(resolve(A).d.m).toBeUndefined();
  unserialize(
    [["Array", [["A", 1]]], {"d": ["R", 2]}, {"m": ["Array", [5, 6, 7]]}]
  );
  expect(resolve(A).d.m).toEqual([5,6,7]);
});

test("Should work DidSerialize handler", () => {
  class A {
    @store d = "10";
    m: string;
    [DidUnserialize]() {
      this.m = "M" + this.d;
    }
  }
  register("A", A);
  unserialize(
    [["Array", [["A", 1]]], {d: "11"}]
  );
  expect(resolve(A).m).toBe("M11");
});

test("Should throw error with invalid store data", () => {
  class B {}
  class A {
    @store d = new B;
  }
  register("A", A);
  const a = resolve(A);
  expect(serialize).toThrowError("Supported only registered store containers as serializable class instances");

  a.d = () => void 0;
  expect(serialize).toThrowError("Functions unsupported");
});

test("Should support standard data structures", () => {
  class A {
    @store d: any;
  }
  register("A", A);

  // null
  resolve(A).d = null;
  expect(serialize()).toEqual(
    [["Array", [["A", 1]]], {"d": null}]
  );
  resetDi();
  expect(resolve(A).d).toBeUndefined();
  unserialize(
    [["Array", [["A", 1]]], {"d": null}]
  );
  expect(resolve(A).d).toBe(null);

  // Array
  resolve(A).d = [1,2,3];
  expect(serialize()).toEqual(
    [["Array", [["A", 1]]], {"d": ["Array", [1, 2, 3]]}]
  );
  resetDi();
  expect(resolve(A).d).toBeUndefined();
  unserialize(
    [["Array", [["A", 1]]], {"d": ["Array", [3, 4, 5]]}]
  );
  expect(resolve(A).d).toEqual([3,4,5]);

  // Date
  const date = "Sun Feb 09 2020 17:00:05 GMT+0800";
  const Time = 1581238805000;
  resolve(A).d = new Date(date);
  expect(serialize()).toEqual(
    [["Array", [["A", 1]]], {"d": ["Date", Time]}]
  );
  resetDi();
  expect(resolve(A).d).toBeUndefined();
  unserialize(
    [["Array", [["A", 1]]], {"d": ["Date", Time]}]
  );
  expect(resolve(A).d).toEqual(new Date(date));

  // Map
  const map = new Map();
  map.set(1, [1, 2]);
  map.set(2, {a: 10});
  resolve(A).d = map;
  expect(serialize()).toEqual(
    [["Array", [["A", 1]]], {"d": ["Map", ["Array", [
      ["Array", [1, ["Array", [1, 2]]]],
      ["Array", [2, {"a": 10}]]
    ]]]}]
  );
  resetDi();
  expect(resolve(A).d).toBeUndefined();
  unserialize(
    [["Array", [["A", 1]]], {"d": ["Map", ["Array", [
      ["Array", [1, ["Array", [1, 2]]]],
      ["Array", [2, {"a": 10}]]
    ]]]}]
  );
  expect(resolve(A).d).toEqual(new Map(map));

  // Map
  const set = new Set();
  set.add(1);
  set.add(3);
  set.add("D");
  resolve(A).d = set;
  expect(serialize()).toEqual(
    [["Array", [["A", 1]]], {"d": ["Set", ["Array", [1, 3, "D"]]]}]
  );
  resetDi();
  expect(resolve(A).d).toBeUndefined();
  unserialize(
    [["Array", [["A", 1]]], {"d": ["Set", ["Array", [1, 3, "D"]]]}]
  );
  expect(resolve(A).d).toEqual(new Set(set));
  expect(resolve(A).d.has("D")).toBeTruthy();
});

test("Should pass non class instance in serialize correctly", () => {
  class A { @store d = 10; }
  register("A", A);
  resolve(A);
  resolve({});
  resolve(() => void 0);
  expect(serialize()).toEqual([["Array", [["A", 1]]], {"d": 10}]);
});

test("Should throw unexistence class id in unserialize", () => {
  class B { @store d = 10; }
  register("B", B);

  expect(() => {
    unserialize([["Array", [["A", 1]]], {}]);
  }).toThrowError("Registered class id \"A\" not found");

  expect(() => {
    unserialize(
      [["Array", [["B", 1]]], {d: ["__INCORRECT_DATA__"]}]
    );
  }).toThrowError("Registered class id \"__INCORRECT_DATA__\" not found");
});

test("Should use only one instance of entity in several stores", () => {
  let b: B;
  const DATA = [["Array", [["B", 1]]], {"a1": ["A", 2], "a2": ["A", 2]}, {"d": ["M", 3]}, {"d": "M"}];
  class M { @store d: string; }
  register("M", M);
  class A { @store d: M; }
  register("A", A);
  class B {
    @store a1: A;
    @store a2: A;
  }
  register("B", B);
  b = resolve(B);
  b.a2 = b.a1 = new A;
  b.a1.d = new M;
  b.a1.d.d = "M";
  expect(serialize()).toEqual(DATA);
  resetDi();
  unserialize(DATA);
  expect(resolved(B)).toBeTruthy();
  b = resolve(B);
  expect(b.a1).toBe(b.a2);
  expect(b.a1.d instanceof M).toBeTruthy();
  expect(b.a2.d.d).toBe("M");
});
