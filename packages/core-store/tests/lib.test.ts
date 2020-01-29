import { factory } from "~/lib";

const {
  store,
  subscribe,
  isContainer
} = factory();

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
