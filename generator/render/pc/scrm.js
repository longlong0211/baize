module.exports = (api, options) => {
  api.render(files => {
    Object.keys(files)
      .forEach(path => delete files[path])
  })
  // githook validate-commit-msg git-cz相关配置
  api.extendPackage({
    devServer: {
      host: '0.0.0.0',
      port: 4001
    },
    browserslist: [
      '> 1%',
      'last 2 versions',
      'not ie <= 10'
    ],
    'lint-staged': {
      'src/**/*.{js,jsx}': [
        'eslint --fix'
      ],
      'subtree/**/*.{js,jsx}': [
        'eslint'
      ],
      '**/*.less， !src/BusinessComponent/**': 'stylelint --syntax less'
    }
  })
  // 命令
  api.generator.pkg.scripts = {
    serve: 'npm run start:dev',
    'start:dev': 'cross-env NODE_ENV_BJX=dev ESLINT=none  PORT=9010  roadhog dev ',
    'start:uat': 'cross-env NODE_ENV_BJX=uat ESLINT=none  PORT=9010  roadhog dev ',
    'start:staging': 'cross-env NODE_ENV_BJX=pre ESLINT=none  PORT=9010  roadhog dev ',
    'start:product': 'cross-env NODE_ENV_BJX=pro ESLINT=none  PORT=9010  roadhog dev ',
    'build:dev': 'bin/config dev && npm run clean && cross-env NODE_ENV_BJX=dev ESLINT=none roadhog build',
    'build:uat': 'bin/config uat && npm run clean && cross-env NODE_ENV_BJX=uat ESLINT=none roadhog build',
    'build:pre': 'bin/config staging && npm run clean && cross-env NODE_ENV_BJX=pre ESLINT=none roadhog build',
    'build:product': 'bin/config product && npm run clean && cross-env NODE_ENV_BJX=pro ESLINT=none roadhog build',
    site: 'roadhog-api-doc static && gh-pages -d dist',
    analyze: 'cross-env ANALYZE=true roadhog build',
    'lint:style': 'stylelint "src/**/*.less" --syntax less',
    lint: 'eslint --ext .js src mock tests && npm run lint:style',
    'lint:fix': 'eslint --fix --ext .js src mock tests && npm run lint:style',
    test: 'jest',
    'test:component': 'roadhog test ./src/components',
    'test:all': 'node ./tests/run-tests.js',
    clean: 'rimraf ./dist',
    'jest-watch': 'jest --watch'
  }
  // 安装一些基础公共库
  api.generator.pkg.dependencies = {
    '@antv/data-set': '^0.8.0',
    '@babel/polyfill': '^7.0.0',
    '@giantmachines/redux-websocket': '^1.1.0',
    '@hanyk/rc-viewer': '0.0.3',
    '@sentry/browser': '4.2.3',
    antd: '3.19.8',
    'babel-plugin-transform-remove-console': '^6.9.4',
    'babel-runtime': '^6.9.2',
    bizcharts: '3.5.5',
    'bizcharts-plugin-slider': '^2.0.1',
    classnames: '^2.2.6',
    dva: '^2.1.0',
    'dva-loading': '^1.0.4',
    'enquire-js': '^0.1.1',
    'file-saver': '^2.0.1',
    history: '4.7.2',
    html2canvas: '^1.0.0-rc.3',
    'js-cookie': '^2.2.0',
    jsbarcode: '^3.11.0',
    localforage: '^1.7.3',
    lodash: '4.17.15',
    'lodash-decorators': '^4.4.1',
    moment: '^2.19.1',
    numeral: '^2.0.6',
    'omit.js': '^1.0.0',
    'path-to-regexp': '^2.1.0',
    'prop-types': '^15.5.10',
    'qrcode.react': '^0.9.3',
    qs: '^6.9.0',
    'rc-drawer-menu': '^0.5.0',
    react: '16.9.0',
    'react-container-query': '^0.11.0',
    'react-copy-to-clipboard': '^5.0.1',
    'react-document-title': '^2.0.3',
    'react-dom': '^16.9.0',
    'react-fittext': '^1.0.0',
    'react-lines-ellipsis': '^0.14.1',
    'react-sortable-hoc': '^1.10.1',
    'react-virtualized-auto-sizer': '^1.0.2',
    'react-window': '^1.8.5',
    rollbar: '^2.3.4',
    underscore: '^1.9.1',
    'url-polyfill': '^1.0.10',
    viewerjs: '^1.3.3',
    wangeditor: '^3.1.1',
    websocket: '^1.0.26'
  }
  api.generator.pkg.devDependencies = {
    '@arctic/eslint-plugin-arctic': 'git+https://oauth2:3g7zqTDbk5PFG9s32fFf@gitlab.medcloud.cn/pub/arctic-eslint-plugin-arctic.git',
    '@babel/core': '^7.9.6',
    '@babel/plugin-proposal-decorators': '^7.4.4',
    '@babel/plugin-proposal-nullish-coalescing-operator': '^7.4.4',
    '@babel/plugin-proposal-object-rest-spread': '7.5.5',
    '@babel/plugin-proposal-optional-chaining': '^7.2.0',
    '@babel/preset-env': '^7.9.6',
    '@babel/preset-react': '^7.0.0',
    '@eku/eku-tools': 'git+https://oauth2:3g7zqTDbk5PFG9s32fFf@gitlab.medcloud.cn/pub/eku-tools.git',
    'babel-eslint': '^10.0.3',
    'babel-jest': '^25.5.1',
    'babel-plugin-dva-hmr': '^0.4.1',
    'babel-plugin-import': '^1.6.3',
    'babel-plugin-transform-decorators-legacy': '^1.3.5',
    'babel-plugin-transform-remove-console': '^6.9.4',
    bjxcomponents: 'git+https://oauth2:3g7zqTDbk5PFG9s32fFf@gitlab.medcloud.cn/pub/bjxcomponents.git#1.1.59',
    clipboard: '^2.0.4',
    'cross-env': '^5.1.1',
    'cross-port-killer': '^1.0.1',
    echarts: '^4.2.0-rc.2',
    enzyme: '^3.1.0',
    eslint: '^6.6.0',
    'eslint-plugin-promise': '^4.2.1',
    'eslint-plugin-react': '^7.16.0',
    'eslint-plugin-react-hooks': '^2.2.0',
    'gh-pages': '^1.0.0',
    jest: '^25.5.3',
    'lint-staged': '^9.4.2',
    mockjs: '^1.0.1-beta3',
    'pro-download': '^1.0.1',
    'react-test-renderer': '^16.13.1',
    'react-to-print': 'git+https://oauth2:3g7zqTDbk5PFG9s32fFf@gitlab.medcloud.cn/pub/react-to-print.git#c3dd2348fa5992323770ffe6f30817279addc309',
    'redbox-react': '^1.5.0',
    'regenerator-runtime': '^0.11.1',
    rimraf: '^2.6.3',
    roadhog: '2.5.0-beta.4',
    'roadhog-api-doc': '^1.1.2',
    stylelint: '^10.0.1',
    'stylelint-config-standard': '^18.0.0',
    'velocity-react': '^1.4.1'
  }

  // 读取模版
  api.render('../../template/scrm')

  api.onCreateComplete(async () => {
    await new Promise((resolve, reject) => {
      const installRoadhog = require('child_process').spawn('npm', ['i', 'roadhog@2.5.0-beta.4', '-D'])
      installRoadhog.on('data', data => console.log(data))
      installRoadhog.on('error', error => {
        console.error(error)
        reject(error)
      })
      installRoadhog.on('close', code => {
        resolve()
      })
    })
  })
}
