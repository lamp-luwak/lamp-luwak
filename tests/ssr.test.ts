import { serialize, unserialize, register } from "~/ssr";
import { store, resolve } from "~/.";

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
