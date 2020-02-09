import { serialize, unserialize, register, DidUnserialize } from "~/ssr";
import { store, resolve } from "~/.";

test("Should work serialize", () => {
  class A {
    @store d = "D";
  }
  register("A", A);
  resolve(A);
  expect(JSON.stringify(serialize())).toBe(JSON.stringify({A:{d:"D"}}));
});

test("should work unserialize", () => {
  class A {
    @store d = "D";
  }
  register("A", A);
  unserialize({
    A: {d:"DD"}
  });
  expect(resolve(A).d).toBe("DD");
});

test("Should work DidSerialize handler", () => {
  class A {
    @store d = "10";
    m: string;
    [DidUnserialize]() {
      this.m = "M" + this.d;
    }
  }
  register("A", A);
  unserialize({
    A: {d:"11"}
  });
  expect(resolve(A).m).toBe("M11");
});
