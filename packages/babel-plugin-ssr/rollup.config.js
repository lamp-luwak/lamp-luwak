"use strict";
import typescript from "rollup-plugin-typescript2";
import pkg, { devDependencies } from "./package.json";

export default {
  input: pkg.source,
  output: [{
    file: pkg.main,
    format: "cjs",
    sourcemap: true,
  }],
  external: Object.keys(devDependencies),
  plugins: [
    typescript({
      tsconfig: "./tsconfig.release.json",
      // verbosity: 3,
    })
  ]
}
