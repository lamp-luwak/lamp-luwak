import { lens, store } from "../src";
import { read, write } from "../src/lens";

test("Should create from array of two functions", () => {
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
