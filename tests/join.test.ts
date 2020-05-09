import { store, join, get, set, lens, view, connect } from "../src";

test("Should create join", () => {
  const a = store();
  const b = store({});
  join(a, b, "hello");
  set(a, 12);
  expect(get(b)).toStrictEqual({ hello: 12 });
});

test("Should create join with lens call", () => {
  const a = store();
  const b = store({});
  join(a, b, lens("hello"));
  set(a, 13);
  expect(get(b)).toStrictEqual({ hello: 13 });
});

test("Should create join with custom lens", () => {
  const a = store();
  const b = store();
  const l = lens(
    "a",
    lens("b"),
    [
      (state) => ((state || {}).v || {}).v,
      (state, v) => ({ ...state, v: { v }})
    ]
  );
  join(a, b, l);
  set(a, { b: 17 });
  expect(get(b)).toStrictEqual({ a: { b: { v: { v: { b: 17 } } } } });
  set(view(b, l), { b: 22 });
  expect(get(b)).toStrictEqual({ a: { b: { v: { v: { b: 22 } } } } });
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
  expect(get(b)).toStrictEqual({ c: 17 });
  set(b, 9);
  expect(get(a)).toStrictEqual({ b: 9 });
});

test("Should work connect", () => {
  const a = store();
  const b = store();
  const off = connect(b, a, "hello");
  set(a, {hello: 10});
  set(b, (s: number) => s + 5);
  expect(get(a)).toStrictEqual({hello: 15});
  expect(get(b)).toBe(15);
  off();
  set(a, {hello: 20});
  set(b, (s: number) => s + 5);
  expect(get(a)).toStrictEqual({hello: 20});
  expect(get(b)).toBe(20);
});

test("Should work join with two views", () => {
  const a = store();
  const b = store();
  join(view(a, "a"), view(b, "b"));
  set(a, {a: 10});
  expect(get(b)).toStrictEqual({ b: 10 });
  set(view(b, lens("b")), 11);
  expect(get(a)).toStrictEqual({ a: 11 });
});
