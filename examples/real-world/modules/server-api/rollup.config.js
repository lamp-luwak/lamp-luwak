"use strict";
import typescript from "rollup-plugin-typescript2";
import transformPaths from '@zerollup/ts-transform-paths'
import pkg, { dependencies } from "./package.json";

export default {
  input: pkg.source,
  output: [{
    file: pkg.main,
    format: "cjs",
    sourcemap: false,
  }],
  external: Object.keys(dependencies),
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      transformers: [service => transformPaths(service.getProgram())]
      // verbosity: 3,
    })
  ]
}
