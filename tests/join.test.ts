import { store, join, get, set, update } from "../src";

test("Should create join", () => {
  const a = store();
  const b = store({});
  join(a, b, "hello");
  set(a, 12);
  expect(get(b)).toStrictEqual({ hello: 12 });
});

test("Should create join with 3 pieces path", () => {
  const a = store();
  const b = store();
  join(a, b, "a", "b", "v", "v");
  set(a, { b: 17 });
  expect(get(b)).toStrictEqual({ a: { b: { v: { v: { b: 17 } } } } });
  set(b, { a: { b: { v: { v: { b: 22 } } } } });
  expect(get(a)).toStrictEqual({ b: 22 });
});

test("Should work join in class store", () => {
  const b = store();
  class A {
    state = {}
    b = join(b, this, "b");
  }
  const a = store(A);
  set(a, {b: { c: 17 }} as any);
  update(a, {m: 10} as any);
  expect(get(b)).toStrictEqual({ c: 17 });
  set(b, 9);
  expect(get(a)).toStrictEqual({ b: 9, m: 10 });
});
