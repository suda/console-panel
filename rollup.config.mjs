import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

const plugins = [
  commonjs(),
  json()
];

export default [
  {
    input: 'src/console.js',
    output: {
      dir: 'lib',
      exports: 'default',
      format: 'cjs',
      sourcemap: true
    },
    external: [
      'atom',
      'electron',
      'event-kit',
      'atom-space-pen-views'
    ],
    plugins: plugins
  },

];
