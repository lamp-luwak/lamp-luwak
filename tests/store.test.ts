import { store, subscribe, isContainer, make, state, quiet, notify } from "~/store";
import { Updaters } from "~/store/consts";
const { initialValues } = state;

test("Should notify after store value changed", () => {
  const spy = jest.fn();
  class A {
    @store d: string;
  }
  const a = new A;
  subscribe(a, spy);
  a.d = "D";
  expect(spy).toBeCalledTimes(1);
  a.d = "D";
  expect(spy).toBeCalledTimes(1);
  a.d = "E";
  expect(spy).toBeCalledTimes(2);
});

test("Should pass store container check", () => {
  class A {}
  class B { @store d: any; }
  expect(isContainer(new A)).toBeFalsy();
  expect(isContainer(new B)).toBeTruthy();
});

test("Should work make", () => {
  class A {
    @store d = "10";
  }
  const a = make(A, { d: "11" });
  expect(a.d).toBe("11");
});

test("Should work transit throw from make and clear initial values", () => {
  class A {
    @store d = "10";
    constructor() {
      throw new Error("AA");
    }
  }
  expect(() => {
    make(A, { d: "11" });
  }).toThrowError("AA");
  expect(initialValues.has(A)).toBeFalsy();
});

test("Should work quiet", () => {
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  const spy3 = jest.fn();
  quiet(() => {
    notify({ [Updaters]: [spy1] });
    spy2();
  });
  notify({ [Updaters]: [spy3] });
  expect(spy1).not.toBeCalled();
  expect(spy2).toBeCalled();
  expect(spy3).toBeCalled();
});

test("Should work quiet with pass exception", () => {
  const spy1 = jest.fn();
  expect(() => {
    quiet(() => {
      throw new Error("BB");
    });
  }).toThrowError("BB");
  notify({ [Updaters]: [spy1] });
  expect(spy1).toBeCalled();
});
