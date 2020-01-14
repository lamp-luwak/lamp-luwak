const transform = require("@babel/core").transform;
const plugin = require("./src");

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
}
`;

const transformedCode = transform(code, {
  plugins: [
    plugin,
  ],
  code: true,
  ast: false,
}).code;

console.log(
  transformedCode
);
