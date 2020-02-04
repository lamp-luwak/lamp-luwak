import { action, listen, dispatch } from "~/lib";

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
