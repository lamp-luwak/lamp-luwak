import { lens, store, view, set, get } from "../src";
import { read, write } from "../src/lens";

test("Should create lens from array of two functions", () => {
  const l = lens("hello", [
    (state) => state.sync,
    (state, sync) => ({ ...state, sync })
  ]);
  const s = store({
    hello: {
      sync: 10
    }
  });
  expect(read(s, l)).toBe(10);
  write(s, l, 77);
  expect(s.state.hello.sync).toBe(77);
});

test("Should create view from view and save one level depth", () => {
  const s = store();
  const v = view(view(view(s, "a"), "b"), lens("c")) as any;
  set(v, 1);
  expect(v[0]).toBe(s);
  expect(get(view(v[0], v[1]))).toBe(1);
});

test("Should work write with callback", () => {
  const s = store({ a: 10 });
  write(view(s, "a"), (s: number) => s + 5);
  expect(get(s)).toStrictEqual({ a: 15 });
});
