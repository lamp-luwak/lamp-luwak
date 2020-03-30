import { action, subscribe } from "../src";

test("Should work action", () => {
  const spy = jest.fn();
  const a = action();
  subscribe(a, spy);
  a("A", 2);
  expect(spy).toBeCalledWith("A", 2);
});
