import { store, update } from "../src";

test("Should work update without callback", () => {
  const m = { a: 10, m: 9 };
  const a = store(m);
  update(a, { a: 11 });
  expect(a.state).not.toBe(m);
  expect(a.state.a).toBe(11);
  expect(a.state.m).toBe(9);
});

test("Should work update with callback", () => {
  const m = { a: 10, m: 9 };
  const a = store(m);
  update(a, () => ({ a: 11 }));
  expect(a.state).not.toBe(m);
  expect(a.state.a).toBe(11);
  expect(a.state.m).toBe(9);
});
