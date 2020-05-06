import { action, on, dispatch } from "../src/v4";

test("Should work action as function", () => {
  const spy = jest.fn();
  const a = action();
  on(a, spy);
  a("A", 2);
  expect(spy).toBeCalledWith("A", 2);
});

test("Should work action disptach", () => {
  const spy = jest.fn();
  const a = action();
  on(a, spy);
  dispatch(a, "A", 2);
  expect(spy).toBeCalledWith("A", 2);
});
