import { store, ContainerType } from "~/.";

test("Should work with containers", () => {
  class A {
    @store d = "D";
  }
  expect(ContainerType({ a: new A }, "a", "T")).toBeUndefined();
  expect(ContainerType({ a: null }, "a", "T")).toBeUndefined();
  expect(ContainerType({ a: {} }, "a", "T")).toMatchObject(
    new Error("Invalid prop `a` supplied to `T`. Container with store props validation failed.")
  );

});

test("Should work isRequired", () => {
  class A {
    @store d = "D";
  }
  expect(ContainerType.isRequired({ a: new A }, "a", "T")).toBeUndefined();
  expect(ContainerType.isRequired({ a: null }, "a", "T")).toMatchObject(
    new Error("Invalid prop `a` supplied to `T`. Container with store props validation failed.")
  );
  expect(ContainerType.isRequired({ b: {} }, "b", "D")).toMatchObject(
    new Error("Invalid prop `b` supplied to `D`. Container with store props validation failed.")
  );
});
