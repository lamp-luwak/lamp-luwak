import { store, join, get, set, lens, view } from "../src";

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
  expect(get(b)).toStrictEqual({ b: 23 });
  expect(get(a)).toStrictEqual({ b: 23 });
});
