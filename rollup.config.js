import {nodeResolve} from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import del from "rollup-plugin-delete";
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import image from 'rollup-plugin-img';
// import copy from 'rollup-plugin-copy';

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      // {
      //   file: packageJson.main,
      //   format: "cjs",
      //   sourcemap: true
      // },
      // {
      //   file: packageJson.module,
      //   format: "es",
      //   sourcemap: true
      // },
      {
        file: packageJson.main,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      del({ targets: 'dist/*' }),
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      json(),
      postcss({
        minimize: true,
        modules: true,
        extensions: ['.css', '.scss']
      }),
      image({
        output: `dist/images`, // default the root
        extensions: /\.(png|jpg|jpeg|gif|svg)$/, // support png|jpg|jpeg|gif|svg, and it's alse the default value
        limit: 8192,  // default 8192(8k)
        exclude: 'node_modules/**'
      })
      // image({
      //   dom:true
      // }),
      // copy({
      //   targets: [
      //     {
      //       src: ["src/components/imgs/*"],
      //       dest: "./dist/imgs"
      //     },
      //     {
      //       src: ["src/components/utils/*"],
      //       dest: "./dist/utils"
      //     },
      //   ],
      //   verbose: true
      // })
    ],
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/, 'react'],
  },
];