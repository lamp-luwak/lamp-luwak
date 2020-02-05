import { action, listen, dispatch, lock, unlock } from "~/lib";

test("Should work action dispatching", () => {
  const spy1 = jest.fn();
  const spy2 = jest.fn();

  class A {
    static RemoveItem = action();

    constructor() {
      spy2();
    }

    @listen(A.RemoveItem)
    handler(...args: any[]) {
      spy1(...args);
    }
  }

  expect(spy1).toBeCalledTimes(0);
  expect(spy2).toBeCalledTimes(0);
  dispatch(A.RemoveItem);
  expect(spy1).toBeCalledTimes(1);
  expect(spy2).toBeCalledTimes(1);
  dispatch(A.RemoveItem, "B", "C");
  expect(spy1).toBeCalledTimes(2);
  expect(spy2).toBeCalledTimes(1);
  expect(spy1).lastCalledWith("B", "C");
});

test("Should work lock/unlock", () => {
  const spy1 = jest.fn();
  const T = action();
  class A {
    @listen(T)
    handler() {
      spy1();
    }
  }

  dispatch(T);
  expect(spy1).toBeCalledTimes(1);
  lock(T);
  dispatch(T);
  dispatch(T);
  expect(spy1).toBeCalledTimes(1);
  unlock(T);
  dispatch(T);
  expect(spy1).toBeCalledTimes(2);
});
