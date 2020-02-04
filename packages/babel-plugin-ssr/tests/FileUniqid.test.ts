import { FileUniqid } from "~/FileUniqid";

test("Should generate different value each time", () => {
  const uniqid = new FileUniqid();
  const n1 = uniqid.next();
  const n2 = uniqid.next();
  expect(n2).not.toBe(n1);
});

test("Should use different algoritm for different platform", () => {
  const uniqid = new FileUniqid();
  uniqid.reset("package.json");
  const n1 = uniqid.next();
  if (process.platform === "win32") {
    expect(n1).toMatch(/[a-zA-Z0-9/+]{23}/);
  } else {
    expect(n1).toMatch(/[a-z0-9]{2,}/);
  }
  uniqid.reset();
  const n2 = uniqid.next();
  expect(n2).toMatch(/[a-zA-Z0-9/+]{23}/);
  uniqid.reset("__UNDEFINED_FILE__");
  const n3 = uniqid.next();
  expect(n3).toMatch(/[a-zA-Z0-9/+]{23}/);
});

test("Should generate different values on different seeds", () => {
  const uniqid = new FileUniqid();
  const n1 = uniqid.next();
  uniqid.reset("README.md");
  const n2 = uniqid.next();
  uniqid.reset("package.json");
  const n3 = uniqid.next();

  expect(n2).not.toBe(n1);
  expect(n3).not.toBe(n2);
  expect(n1).not.toBe(n3);
});
