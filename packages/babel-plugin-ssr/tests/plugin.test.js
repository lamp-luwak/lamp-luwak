jest.mock("../src/uniqid");

const uniqidMock = require("../src/uniqid");

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

test("It works", () => {
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

require("~/lib/core").register("A_5m6", A);

hello(require("~/lib/core").register("5m7", @mut
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

require("~/lib/core").register("B_5m8", B);

class C {
  @some
  c;
}`

  expect(transform(code)).toBe(transformedCode);
});
