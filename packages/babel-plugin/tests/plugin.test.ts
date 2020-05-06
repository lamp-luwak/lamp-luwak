import { plugin } from "../src/plugin";

const LIB = "lamp-luwak";
const KEY_A = "1B2M2Y8AsgTpgAmY7PhCfg0";

function transform(code: string) {
  return require("@babel/core").transform(code, {
    plugins: [ plugin ],
    code: true,
    ast: false,
  }).code;
}

test("Should register classes with state property", () => {
  const code = `class A {
  state = {}
}`;
  const transformedCode = `class A {
  state = {};
}

require("${LIB}").register(A, "A_${KEY_A}");`;
  expect(transform(code)).toBe(transformedCode);
});

test("Should work with class expression", () => {
  const code = "hello(class { state = 0; });";

  const transformedCode = `hello(require("${LIB}").register(class {
  state = 0;
}, "${KEY_A}"));`;

  expect(transform(code)).toBe(transformedCode);
});
