import { update } from "~/lib";

test("Should work update with objects", () => {
  const s1 = { a: 10, c: 5 };
  const s2 = { a: 11, b: 10 };
  const s3 = update(s1, s2);

  expect(s3).not.toBe(s2);
  expect(s3).not.toBe(s2);
  expect(s3).toMatchObject({ a: 11, b: 10, c: 5});
});

test("Should work update with arrays", () => {
  const s1 = [1, 2, 3];
  const s2 = [5, 6];
  const s3 = update(s1, s2);

  expect(s3).not.toBe(s2);
  expect(s3).not.toBe(s2);
  expect(s3).toMatchObject([1, 2, 3, 5, 6]);
});
