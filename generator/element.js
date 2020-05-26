module.exports = (api, options) => {
  api.extendPackage({
    dependencies: {
      'element-ui': '^2.13.1'
    }
  })
  api.render('../ui/element')
}
