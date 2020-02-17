import { action, on, once, dispatch, lock, unlock } from "~/lib";
import { resolve } from "@impress/react";

test("Should work action dispatching on class decorator", () => {
  const spy1 = jest.fn();
  const spy2 = jest.fn();

  class A {
    static RemoveItem = action();

    constructor() {
      spy2();
    }

    @on(A.RemoveItem)
    handler(...args: any[]) {
      spy1(...args);
    }
  }

  expect(spy1).toBeCalledTimes(0);
  expect(spy2).toBeCalledTimes(0);
  dispatch(A.RemoveItem);
  expect(spy1).toBeCalledTimes(0);
  expect(spy2).toBeCalledTimes(0);
  resolve(A);
  dispatch(A.RemoveItem);
  expect(spy1).toBeCalledTimes(1);
  expect(spy2).toBeCalledTimes(1);
  dispatch(A.RemoveItem, "B", "C");
  expect(spy1).toBeCalledTimes(2);
  expect(spy2).toBeCalledTimes(1);
  expect(spy1).lastCalledWith("B", "C");
});

test("Should work action dispatching on class decorator once", () => {
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  const T = action();
  class A {
    @once(T)
    handler1(...args: any[]) {
      spy1(...args);
    }

    @on(T)
    handler2(...args: any[]) {
      spy2(...args);
    }
  }
  resolve(A);
  dispatch(T, 1);
  dispatch(T, 5);
  expect(spy1).toBeCalledTimes(1);
  expect(spy1).lastCalledWith(1);
  expect(spy2).toBeCalledTimes(2);
  expect(spy2).lastCalledWith(5);
});

test("Should work lock/unlock", () => {
  const spy1 = jest.fn();
  const T = action();
  class A {
    @on(T)
    handler() {
      spy1();
    }
  }
  resolve(A);
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

test("Should work action dispatching", () => {
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  const spy3 = jest.fn();
  const spy4 = jest.fn();
  const T = action();
  on(T, spy1);
  on(T)(spy2);
  once(T, spy3);
  once(T)(spy4);

  dispatch(T, 5);
  dispatch(T, 1, 2);

  expect(spy1).toBeCalledTimes(2);
  expect(spy1).lastCalledWith(1, 2);

  expect(spy2).toBeCalledTimes(2);
  expect(spy2).lastCalledWith(1, 2);

  expect(spy3).toBeCalledTimes(1);
  expect(spy3).lastCalledWith(5);

  expect(spy4).toBeCalledTimes(1);
  expect(spy4).lastCalledWith(5);
});

test("Should pass exception on once", () => {
  const spy1 = jest.fn();
  const T = action();
  once(T, (...args: any[]) => {
    spy1(...args);
    throw "A";
  });

  expect(() => {
    dispatch(T, 5);
  }).toThrow("A");
  expect(spy1).toBeCalledWith(5);
  dispatch(T, 6);
  expect(spy1).toHaveBeenLastCalledWith(5);
  expect(spy1).toBeCalledTimes(1);
});

test("Should work only with resolved classes as decorator", () => {
  const spy1 = jest.fn();
  const T = action();
  class A {
    @on(T)
    handler() {
      spy1();
    }
  }
  dispatch(T);
  expect(spy1).toBeCalledTimes(0);
})
