import { subscribe } from "../src";
import { Subscribers } from "../src/subscriber";

test("Should throw exception subscriber already attached", () => {
  const fn = () => void 0;
  const obj = {};
  subscribe(obj, fn);
  expect(function() {
    subscribe(obj, fn);
  }).toThrowError("Subscriber already attached");
});

test("Should work unsubscribe", () => {
  const fn = () => void 0;
  const obj = {} as any;
  const off = subscribe(obj, fn);
  const off2 = subscribe(obj, fn, {});

  expect(obj[Subscribers].length).toBe(2);
  off();
  expect(obj[Subscribers].length).toBe(1);
  off2();
  expect(obj[Subscribers].length).toBe(0);
});
