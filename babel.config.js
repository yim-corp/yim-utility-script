module.exports = {
  presets: [
    [
      "@babel/env",
      {
        modules: false,
        targets: {
          node: 10,
        }
      }
    ]
  ],
  env: {
    cjs: {
      presets: [
        [
          '@babel/env',
          {
            targets: {
              node: 6,
            },
            useBuiltIns: 'usage',
            corejs: "2.0"
          }
        ]
      ]
    }
  }
};