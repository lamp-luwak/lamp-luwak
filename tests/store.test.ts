import { store, subscribe, isContainer, make, quiet, notify, values } from "~/store";
import { Updaters } from "~/store/consts";

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

test("Should work several unsubscribers", () => {
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  const spy3 = jest.fn();

  const obj = {} as any;
  const u1 = subscribe(obj, spy1);
  const u2 = subscribe(obj, spy2);
  const u3 = subscribe(obj, spy3);
  notify(obj);
  expect(spy1).toBeCalledTimes(1);
  expect(spy2).toBeCalledTimes(1);
  expect(spy3).toBeCalledTimes(1);
  u3();
  u1();
  notify(obj);
  expect(spy1).toBeCalledTimes(1);
  expect(spy2).toBeCalledTimes(2);
  expect(spy3).toBeCalledTimes(1);
  u2();
  expect(obj[Updaters].length).toBe(0);
});

test("Should work values for non store containers", () => {
  expect(values({a: 10})).toMatchObject({});
});

test("Should make non store container correctly", () => {
  class A {}
  const a = make(A, {});
  expect(a instanceof A).toBeTruthy();
});

test("Should work make for different key sets", () => {
  class A {
    @store d = "D";
    @store m = "M";
  }
  expect(make(A, {m: "11"})).toMatchObject({d:"D", m:"11"});
});

test("Should work inititializer in store decorator", () => {
  const target = {} as any;
  const descriptor = store(target, "a", { initializer: () => "A" });
  Object.defineProperty(target, "a", descriptor);
  expect(target.a).toBe("A");
  expect(values(target)).toMatchObject({a:"A"});
});
