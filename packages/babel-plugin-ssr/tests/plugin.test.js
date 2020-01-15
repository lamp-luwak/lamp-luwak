jest.mock("../src/uniqid");

const uniqidMock = require("../src/uniqid");

const LIB = "@impress/react";
const UNIQ_1 = "5m6";
const UNIQ_2 = "5m7";
const UNIQ_3 = "5m8";

uniqidMock
  .mockReturnValueOnce(UNIQ_1)
  .mockReturnValueOnce(UNIQ_2)
  .mockReturnValueOnce(UNIQ_3);

function transform(code) {
  return require("@babel/core").transform(code, {
    plugins: [ require("../src") ],
    code: true,
    ast: false,
  }).code;
}

test("Should pass class without decorators", () => {
  const code = `class A {
  n = 0;
  m() {}
}`;
  const transformedCode = `class A {
  n = 0;

  m() {}

}`;
  expect(transform(code)).toBe(transformedCode);
});

test("Should add register function call for each store container", () => {
  const code = `
@mut
export class A {
  @store data;
}
hello(@mut class {
  @store data;
});
class B {
  @store a;
  @store b;
}
class C {
  @some c;
}`;

  const transformedCode = `export @mut
class A {
  @store
  data;
}

require("${LIB}").register("A_${UNIQ_1}", A);

hello(require("${LIB}").register("${UNIQ_2}", @mut
class {
  @store
  data;
}));

class B {
  @store
  a;
  @store
  b;
}

require("${LIB}").register("B_${UNIQ_3}", B);

class C {
  @some
  c;
}`;

  expect(transform(code)).toBe(transformedCode);
});
