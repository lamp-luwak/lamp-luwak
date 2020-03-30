import { plugin } from "../src/plugin";

const LIB = "@impress/react";
const KEY_A = "1B2M2Y8AsgTpgAmY7PhCfg0";

function transform(code: string) {
  return require("@babel/core").transform(code, {
    plugins: [ plugin ],
    code: true,
    ast: false,
  }).code;
}

test("Should register classes with store property", () => {
  const code = `class A {
  store = {}
}`;
  const transformedCode = `class A {
  store = {};
}

require("${LIB}").register(A, "A_${KEY_A}");`;
  expect(transform(code)).toBe(transformedCode);
});

test("Should work with class expression", () => {
  const code = "hello(class { store = 0; });";

  const transformedCode = `hello(require("${LIB}").register(class {
  store = 0;
}, "${KEY_A}"));`;

  expect(transform(code)).toBe(transformedCode);
});
