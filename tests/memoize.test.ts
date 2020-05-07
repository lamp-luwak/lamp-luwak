import { memoize } from "../src";

test("Should work memoize", () => {
  const fn = jest.fn();
  let a = 0;
  let b = 1;
  const m = memoize(
    () => [a, b],
    fn
  );

  m();
  m();
  expect(fn).toHaveBeenLastCalledWith(0, 1);
  expect(fn).toBeCalledTimes(1);
  a = 1;
  m();
  m();
  expect(fn).toHaveBeenLastCalledWith(1, 1);
  expect(fn).toBeCalledTimes(2);
  b = 2;
  m();
  m();
  expect(fn).toHaveBeenLastCalledWith(1, 2);
  expect(fn).toBeCalledTimes(3);
  m(1);
  m(1);
  expect(fn).toHaveBeenLastCalledWith(1, 2, 1);
  expect(fn).toBeCalledTimes(4);
  m(2, 2);
  m(2, 2);
  expect(fn).toHaveBeenLastCalledWith(1, 2, 2, 2);
  expect(fn).toBeCalledTimes(5);
});

