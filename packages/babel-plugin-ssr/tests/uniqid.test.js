
const uniqid = require("../src/uniqid");

test("Should generate different value each time", () => {
  expect(uniqid()).toMatch(/[a-z0-9]{5,}/);
  expect(uniqid()).not.toBe(uniqid());
});
