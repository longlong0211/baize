module.exports = (api, options) => {
  // 命令
  api.extendPackage({
    scripts: {
      serve: 'vue-cli-service serve',
      build: 'vue-cli-service build',
      buildDev: 'vue-cli-service build --mode development',
      buildUat: 'vue-cli-service build --mode uat',
      lint: 'vue-cli-service lint --fix',
      commit: 'git-cz',
      release: 'standard-version',
      changelog: 'conventional-changelog -p angular -i CHANGELOG.md -w -s -r 0'
    }
  })

  // 安装一些基础公共库
  api.extendPackage({
    dependencies: {
      axios: '^0.19.1',
      codemirror: '^5.52.0',
      'core-js': '^3.4.4',
      'js-cookie': '^2.2.1',
      'js-sha256': '^0.9.0',
      lodash: '^4.17.15',
      'mavon-editor': '^2.7.7',
      moment: '^2.24.0',
      qrcode2: '^1.2.3',
      qs: '^6.9.4',
      'sanitize-html': '^1.20.1',
      screenfull: '^5.0.2',
      vue: '^2.6.10',
      'vue-router': '^3.1.3',
      vuex: '^3.1.2',
      'vuex-map-fields': '^1.3.6'
    },
    devDependencies: {
      '@vue/cli-plugin-babel': '^4.1.0',
      '@vue/cli-plugin-eslint': '^4.1.0',
      '@vue/cli-plugin-router': '^4.1.0',
      '@vue/cli-plugin-vuex': '^4.1.0',
      '@vue/cli-service': '^4.1.0',
      '@vue/eslint-config-standard': '^4.0.0',
      'babel-eslint': '^10.0.3',
      'babel-plugin-component': '^1.1.1',
      'conventional-changelog-cli': '^2.0.34',
      'cz-conventional-changelog': '^3.2.0',
      eslint: '^5.16.0',
      'eslint-plugin-vue': '^5.0.0',
      ghooks: '^2.0.4',
      'git-repo-info': '^2.1.1',
      jsonfile: '^5.0.0',
      jsonlint: '^1.6.3',
      less: '^3.0.4',
      'less-loader': '^5.0.0',
      'lint-staged': '^10.2.6',
      'node-sass': '^4.13.1',
      'sass-loader': '^8.0.2',
      'script-loader': '0.7.2',
      'standard-version': '^8.0.0',
      'validate-commit-msg': '^2.14.0',
      'vue-cli-plugin-element': '^1.0.1',
      'vue-template-compiler': '^2.6.10',
      'webpack-bundle-analyzer': '^3.6.0'
    }
  })
  // githook validate-commit-msg git-cz相关配置
  api.extendPackage({
    config: {
      ghooks: {
        'pre-commit': 'lint-staged',
        'commit-msg': 'validate-commit-msg'
      },
      'validate-commit-msg': {
        types: ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert'],
        scope: {
          required: false,
          allowed: ['*'],
          validate: false,
          multiple: false
        },
        warnOnFail: false,
        maxSubjectLength: 100,
        subjectPattern: '.+',
        subjectPatternErrorMsg: 'subject does not match subject pattern!',
        helpMessage: '',
        autoFix: false
      },
      commitizen: {
        path: './node_modules/cz-conventional-changelog'
      }
    },
    'lint-staged': {
      'src/**/**.{js,vue}': [
        'vue-cli-service lint --fix',
        'git add'
      ]
    }
  })

  // 读取模版
  api.render('../../template/mgt2')
}
