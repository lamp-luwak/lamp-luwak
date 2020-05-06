import { serialize, unserialize, register, service, store, ssr } from "../src";
import { reset as resetDi, resolved } from "../src/di";

test("Should work serialize", () => {
  class A {
    state = {
      d: "D"
    };
  }
  register(A, "A");
  service(A);
  expect(serialize()).toEqual([[["A", 1]], {"d": "D"}]);
});

test("should work unserialize", () => {
  class A {
    state = "D";
  }
  register(A, "A");
  unserialize(
    [[["A", 1]], "DD"]
  );
  expect(service(A).state).toBe("DD");
});

test("Should work serialize/unserialize nested stores", () => {
  class R {
    state: any;
  }
  register(R, "R");
  class A {
    state = store(R);
  }
  register(A, "A");
  service(A).state.state = [1,2,3];
  expect(serialize()).toEqual(
    [[["A", 1]], ["R", 2], ["Array", [1, 2, 3]]]
  );
  resetDi();
  expect(service(A).state.state).toBeUndefined();
  resetDi();
  unserialize(
    [[["A", 1]], ["R", 2], ["Array", [5, 6, 7]]]
  );
  expect(service(A).state.state).toEqual([5,6,7]);
});

test("Should throw error with invalid store data", () => {
  class B {}
  class A {
    state = new B;
  }
  register(A, "A");
  const a = service(A);
  expect(serialize).toThrowError("Supported only registered store containers as serializable class instances");

  a.state = () => void 0;
  expect(serialize).toThrowError("Functions unsupported");
});

test("Should support standard data structures", () => {
  class A {
    state: any;
  }
  register(A, "A");

  // null
  service(A).state = null;
  expect(serialize()).toEqual(
    [[["A", 1]], null]
  );
  resetDi();
  expect(service(A).state).toBeUndefined();
  resetDi();
  unserialize(
    [[["A", 1]], null]
  );
  expect(service(A).state).toBe(null);

  // Array
  service(A).state = [1,2,3];
  expect(serialize()).toEqual(
    [[["A", 1]], ["Array", [1, 2, 3]]]
  );
  resetDi();
  expect(service(A).state).toBeUndefined();
  resetDi();
  unserialize(
    [[["A", 1]], ["Array", [3, 4, 5]]]
  );
  expect(service(A).state).toEqual([3,4,5]);

  // Date
  const date = "Sun Feb 09 2020 17:00:05 GMT+0800";
  const Time = 1581238805000;
  service(A).state = new Date(date);
  expect(serialize()).toEqual(
    [[["A", 1]], ["Date", Time]]
  );
  resetDi();
  expect(service(A).state).toBeUndefined();
  resetDi();
  unserialize(
    [[["A", 1]], ["Date", Time]]
  );
  expect(service(A).state).toEqual(new Date(date));

  // Map
  const map = new Map();
  map.set(1, [1, 2]);
  map.set(2, {a: 10});
  service(A).state = map;
  expect(serialize()).toEqual(
    [[["A", 1]], ["Map", ["Array", [
      ["Array", [1, ["Array", [1, 2]]]],
      ["Array", [2, {"a": 10}]]
    ]]]]
  );
  resetDi();
  expect(service(A).state).toBeUndefined();
  resetDi();
  unserialize(
    [[["A", 1]], ["Map", ["Array", [
      ["Array", [1, ["Array", [1, 2]]]],
      ["Array", [2, {"a": 10}]]
    ]]]]
  );
  expect(service(A).state).toEqual(new Map(map));

  // Map
  const setInst = new Set();
  setInst.add(1);
  setInst.add(3);
  setInst.add("D");
  service(A).state = setInst;
  expect(serialize()).toEqual(
    [[["A", 1]], ["Set", ["Array", [1, 3, "D"]]]]
  );
  resetDi();
  expect(service(A).state).toBeUndefined();
  resetDi();
  unserialize(
    [[["A", 1]], ["Set", ["Array", [1, 3, "D"]]]]
  );
  expect(service(A).state).toEqual(new Set(setInst));
  expect(service(A).state.has("D")).toBeTruthy();
});

test("Should pass non class instance in serialize correctly", () => {
  class A { state = 10; }
  register(A, "A");
  class B {}
  service(A);
  service(B);
  service(() => ({}));
  expect(serialize()).toEqual([[["A", 1]], 10]);
});

test("Should throw non null exception", () => {
  expect(() => {
    service(() => void 0);
  }).toThrowError("Only object supported for function return.");
});

test("Should throw unexistence class id in unserialize", () => {
  class B { state = 10; }
  register(B, "B");

  expect(() => {
    unserialize([[["A", 1]], {}]);
  }).toThrowError("Registered class id \"A\" not found");

  expect(() => {
    unserialize(
      [[["B", 1]], ["__INCORRECT_DATA__"]]
    );
  }).toThrowError("Registered class id \"__INCORRECT_DATA__\" not found");
});

test("Should use only one instance of entity in several stores", () => {
  let b: B;
  const DATA = [[["B", 1]], {"a1": ["A", 2], "a2": ["A", 2]}, ["M", 3], "M"];
  class M { state: string; }
  register(M, "M");
  class A { state: M; }
  register(A, "A");
  class B {
    state: {
      a1: A;
      a2: A;
    }
  }
  register(B, "B");
  b = service(B);
  b.state = {} as any;
  b.state.a2 = b.state.a1 = store(A);
  b.state.a1.state = store(M);
  b.state.a1.state.state = "M";
  expect(serialize()).toEqual(DATA);
  resetDi();
  unserialize(DATA);
  expect(resolved(B)).toBeTruthy();
  b = service(B);
  expect(b.state.a1).toBe(b.state.a2);
  expect(b.state.a1.state instanceof M).toBeTruthy();
  expect(b.state.a2.state.state).toBe("M");
});

test("Should work ssr function", async () => {
  const spy = jest.fn();
  class A {
    state = "A";
  }
  register(A, "A");
  const a1 = service(A);
  a1.state = "A1";
  const data = await ssr(() => {
    spy();
    const a2 = service(A);
    expect(a2.state).toBe("A");
    a2.state = "DD";
  });
  expect(service(A).state).toBe("A1");
  expect(data).toStrictEqual([[["A", 1]], "DD"]);
});

test("Should pass null in unserialize", () => {
  expect(unserialize(null)).toBeUndefined();
});

test("Should work function factory service with ssr", () => {
  const A = () => ({ state: "A" });
  register(A, "A");
  service(A);
  expect(serialize()).toEqual([[["A", 1]], "A"]);
});
