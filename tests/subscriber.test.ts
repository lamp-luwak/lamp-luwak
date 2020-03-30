import { subscribe } from "../src";

test("Should throw exception subscriber already attached", () => {
  const fn = () => void 0;
  const obj = {};
  subscribe(obj, fn);
  expect(function() {
    subscribe(obj, fn);
  }).toThrowError("Subscriber already attached");
});
