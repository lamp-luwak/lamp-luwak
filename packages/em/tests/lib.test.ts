import { emit, on, once } from "~/lib";

test("Should work event emitting", () => {
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  const spy3 = jest.fn();

  const obj = {};

  on(obj, "e1", spy1);
  on(obj, "e2", spy2);
  once(obj, "e3", spy3);

  emit(obj, "e1", 0);
  emit(obj, "e2", 1);
  emit(obj, "e2", 2);
  emit(obj, "e3", 3);
  emit(obj, "e3", 4);

  expect(spy1).toHaveBeenCalledWith(0);
  expect(spy2).toHaveBeenNthCalledWith(1, 1);
  expect(spy2).toHaveBeenNthCalledWith(2, 2);
  expect(spy3).toHaveBeenLastCalledWith(3);
});
