"use strict";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default {
  input: pkg.source,
  output: [{
    file: pkg.main,
    format: "cjs",
    sourcemap: true,
  }, {
    file: pkg.module,
    format: "esm",
    sourcemap: true,
  }],
  plugins: [
    typescript({ tsconfig: "./tsconfig.release.json" })
  ]
}
