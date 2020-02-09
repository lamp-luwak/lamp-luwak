import { serialize, unserialize, register, DidUnserialize } from "~/ssr";
import { reset as resetDi } from "~/di";
import { store, resolve } from "~/.";

test("Should work serialize", () => {
  class A {
    @store d = "D";
  }
  register("A", A);
  resolve(A);
  expect(JSON.stringify(serialize())).toBe(JSON.stringify({A:{d:"D"}}));
});

test("should work unserialize", () => {
  class A {
    @store d = "D";
  }
  register("A", A);
  unserialize({
    A: {d:"DD"}
  });
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
  expect(serialize()).toEqual({A: {d:
    ["R", {m: ["Array", [1,2,3]]}]
  }});
  resetDi();
  expect(resolve(A).d.m).toBeUndefined();
  unserialize({A: {d:
    ["R", {m: ["Array", [5,6,7]]}]
  }});
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
  unserialize({
    A: {d:"11"}
  });
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
  expect(serialize()).toEqual({
    "A":{"d":null}
  });
  resetDi();
  expect(resolve(A).d).toBeUndefined();
  unserialize({"A":{"d":null}});
  expect(resolve(A).d).toBe(null);

  // Array
  resolve(A).d = [1,2,3];
  expect(serialize()).toEqual({
    "A":{"d":["Array",[1,2,3]]}
  });
  resetDi();
  expect(resolve(A).d).toBeUndefined();
  unserialize({"A":{"d":["Array", [3,4,5]]}});
  expect(resolve(A).d).toEqual([3,4,5]);

  // Date
  const date = "Sun Feb 09 2020 17:00:05 GMT+0800";
  const time = 1581238805000;
  resolve(A).d = new Date(date);
  expect(serialize()).toEqual({
    "A":{"d":["Date",time]}
  });
  resetDi();
  expect(resolve(A).d).toBeUndefined();
  unserialize({"A":{"d":["Date", time]}});
  expect(resolve(A).d).toEqual(new Date(date));

  // Map
  const map = new Map();
  map.set(1, [1, 2]);
  map.set(2, {a: 10});
  resolve(A).d = map;
  expect(serialize()).toEqual({"A": {"d":
    ["Map", ["Array", [
      ["Array", [1, ["Array", [1,2]]]],
      ["Array", [2, { "a": 10 }]]
    ]]]
  }});
  resetDi();
  expect(resolve(A).d).toBeUndefined();
  unserialize({"A": {"d":
    ["Map", ["Array", [
      ["Array", [1, ["Array", [1,2]]]],
      ["Array", [2, { "a": 10 }]]
    ]]]
  }});
  expect(resolve(A).d).toEqual(new Map(map));

  // Map
  const set = new Set();
  set.add(1);
  set.add(3);
  set.add("D");
  resolve(A).d = set;
  expect(serialize()).toEqual({"A": {"d":
    ["Set", ["Array", [ 1,3,"D" ]]]
  }});
  resetDi();
  expect(resolve(A).d).toBeUndefined();
  unserialize({"A": {"d":
    ["Set", ["Array", [ 1,3,"D" ]]]
  }});
  expect(resolve(A).d).toEqual(new Set(set));
  expect(resolve(A).d.has("D")).toBeTruthy();
});
