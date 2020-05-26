module.exports = (api, options, rootOptions) => {
  // 删除 vue-cli3 默认目录
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith('src/') || path.startsWith('public/'))
      .forEach(path => delete files[path])
  })

  if (options.application === 'pc') {
    require('./render/pc/index.js')(api, options)
  } else {
    require('./render/mobile/index.js')(api, options)
  }

  // postcss
  api.extendPackage({
    postcss: {
      plugins: {
        autoprefixer: {}
      }
    }
  })

  if (options['ui-framework'] === 'element-ui') {
    require('./element.js')(api, options)
  }

  // console.log(1111, api)
  // console.log(222, options)

  // 屏蔽 generator 之后的文件写入操作
  // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true
  })
}
