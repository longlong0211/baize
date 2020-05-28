module.exports = (api, options) => {
  switch (options.template) {
  case 'none':
    break
  default:
    require(`./${options.template}`)(api, options)
    break
  }
}
