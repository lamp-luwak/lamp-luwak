"use strict";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import pkg, { dependencies, peerDependencies } from "./package.json";

export default {
  input: pkg.source,
  output: [{
    file: pkg.main,
    format: "cjs",
    sourcemap: true,
  }],
  external: [
    ...Object.keys(dependencies),
    ...Object.keys(peerDependencies)
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.release.json",
      // verbosity: 3,
    }),
    terser()
  ]
}
