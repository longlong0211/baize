module.exports = (api, options) => {
  api.extendPackage({
    dependencies: {
      'lib-flexible': '^0.3.2'
    },
    devDependencies: {
      'postcss-pxtorem': '^4.0.1'
    },
    postcss: {
      plugins: {
        'postcss-pxtorem': {
          rootValue: 37.5,
          unitPrecision: 2,
          propList: ['height', 'line-height', 'width', 'padding', 'margin', 'top', 'left', 'right', 'bottom', 'font-size'],
          selectorBlackList: [],
          replace: true,
          mediaQuery: false,
          minPixelValue: 1
        }
      }
    }
  });
}
