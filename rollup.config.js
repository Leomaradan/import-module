import typescript from '@rollup/plugin-typescript';
import dts from "rollup-plugin-dts";

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'lib',
        format: 'es'
      },
    ],
    plugins: [typescript()]
  },
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'lib-commonjs',
        format: 'cjs',
        name: 'importModule'
      },
    ],
    plugins: [typescript({ lib: ["es5", "es6", "dom"], target: "es5" })]
  },
  {
    input: "./src/index.ts",
    output: [
      {
        file: "type/index.d.ts",
        format: "es"
      }
    ],
    plugins: [dts()],
  },
];
