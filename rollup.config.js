import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'bundle.js',
  output: {
    file: 'index.js',
    format: 'umd',
    name: 'calculator'
  },
  plugins: [
    commonjs(),
    resolve(),
  ],
}
