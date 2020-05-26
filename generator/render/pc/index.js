module.exports = (api, options) => {
  switch (options.template) {
  case 'mgt':
    require('./mgt.js')(api, options)
    break
  case 'mgt2':
    require('./mgt2.js')(api, options)
    break
  default:
    break
  }
}
