import { subscribe, create } from "../src";

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
