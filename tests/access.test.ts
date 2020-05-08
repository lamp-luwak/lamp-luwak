import { set, view, lens, get, store } from "../src";

test("Should work set with view", () => {
  const l = lens("a", lens("b"));
  const s = store();
  set(view(s, l), 10);
  expect(get(s)).toStrictEqual({ a: { b: 10 } });
  set(view(s, "a"), 11);
  expect(get(s)).toStrictEqual({ a: 11 });
});
