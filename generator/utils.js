const fs = require('fs')
const $path = require('path')

module.exports = (api) => {
  return {
    deleteFile (path) {
      const file = api.resolve(path)
      if (fs.existsSync(file)) {
        fs.unlinkSync(file)
      }
    },
    deleteDir (path, recursive = false) {
      const dir = api.resolve(path)
      if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach((o) => {
          const file = dir + $path.sep + o
          if (fs.statSync(file).isDirectory()) {
            fs.readdirSync(file).forEach((p) => {
              try {
                fs.unlinkSync(dir + $path.sep + o + $path.sep + p)
              } catch (error) { }
            })
          } else {
            fs.unlinkSync(file)
          }
        })
        try {
          fs.rmdirSync(dir, { recursive })
        } catch (error) { }
      }
    }
  }
}
