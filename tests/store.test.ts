import { subscribe, create, get, set } from "../src";

test("Should notify after store value changed", () => {
  const spy = jest.fn();
  class A {
    store = "";
  }
  const a = create(A);
  subscribe(a, spy);
  a.store = "D";
  expect(spy).toBeCalledTimes(1);
  a.store = "D";
  expect(spy).toBeCalledTimes(1);
  a.store = "E";
  expect(spy).toBeCalledTimes(2);
});

test("Should work get/set", () => {
  class A {
    store = {
      a: 10,
      b: 20
    };
  }
  const a = create(A);
  expect(get(a)).toStrictEqual({a: 10, b: 20});
  set(a, (store) => ({ ...store, b: 22 }));
  expect(get(a)).toStrictEqual({a: 10, b: 22});
});
