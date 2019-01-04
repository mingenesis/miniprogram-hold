const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');
const pkg = require('./package.json');

const babelConfig = {
  babelrc: false,
  exclude: 'node_modules/**',
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['ie >= 11'],
        },
        exclude: ['transform-async-to-generator', 'transform-regenerator'],
        loose: true,
        modules: false,
      },
    ],
  ],
};

module.exports = [
  // CommonJS
  {
    input: 'src/index.js',
    output: {
      file: 'lib/miniprogram-hold.js',
      format: 'cjs',
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [babel(babelConfig)],
  },

  // ES
  {
    input: 'src/index.js',
    output: {
      file: 'es/miniprogram-hold.js',
      format: 'es',
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [babel(babelConfig)],
  },

  // Miniprogram
  {
    input: 'src/index.js',
    output: {
      file: 'miniprogram_dist/index.js',
      format: 'cjs',
    },
    plugins: [
      nodeResolve({
        jsnext: true,
      }),
      babel(babelConfig),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
    ],
  },
];
