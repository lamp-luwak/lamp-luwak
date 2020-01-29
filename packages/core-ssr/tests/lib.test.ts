import { factory } from "~/lib";
import { factory as factoryDi } from "@impress/di";
import { factory as factoryStore } from "@impress/store";

const { resolve, assign, getInstances, cleanup: cleanupDi } = factoryDi();
const { store, make, values, cleanup: cleanupStore } = factoryStore();

const {
  serialize,
  unserialize,
  cleanup,
  register
} = factory(make, values, assign, getInstances);

afterEach(() => {
  cleanup();
  cleanupDi();
  cleanupStore();
});

test("Should be work serialize", () => {
  class A {
    @store d = "D";
  }
  register("A", A);
  resolve(A);
  expect(JSON.stringify(serialize())).toBe(JSON.stringify({A:{d:"D"}}));
});

test("should be work unserialize", () => {
  class A {
    @store d = "D";
  }
  register("A", A);
  unserialize({
    A: {d:"DD"}
  });
  expect(resolve(A).d).toBe("DD");
});
