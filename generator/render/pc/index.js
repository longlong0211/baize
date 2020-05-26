module.exports = (api, options) => {
  switch (options.template) {
  case 'mgt':
    require('./mgt.js')(api, options)
    break
  default:
    break
  }
}
