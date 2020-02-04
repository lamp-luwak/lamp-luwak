import { update } from "~/lib";

test("Should work update", () => {
  const s1 = { a: 10, c: 5 };
  const s2 = { a: 11, b: 10 };
  const s3 = update(s1, s2);

  expect(s3).not.toBe(s2);
  expect(s3).not.toBe(s2);
  expect(s3).toMatchObject({ a: 11, b: 10, c: 5});
});
