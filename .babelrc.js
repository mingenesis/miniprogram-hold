module.exports = {
  presets: [
    [
      '@babel/env',
      {
        exclude: ['transform-async-to-generator', 'transform-regenerator'],
        loose: true,
        modules: false,
      },
    ],
  ],
};
