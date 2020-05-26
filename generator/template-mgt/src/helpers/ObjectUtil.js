/**
 * Created by coeus on 17/3/19.
 */

const Underscore = require('underscore')._

class ObjectUtil {
  static isEmpty (val) {
    if (val == null) {
      return true
    }

    switch (typeof (val)) {
      case 'string':
        return ObjectUtil.trim(val).length === 0
      case 'number':
        return false
      case 'object':
        if (val.constructor === Array) {
          return val.length === 0
        } else if (val.constructor === Object) {
          if (val == null) {
            return true
          } else {
            for (const name in val) {
              return false
            }
            return true
          }
        } else {
          return val == null
        }
      case 'array':
        return val.length === 0
      case 'function':
        return false
      default:
        return true
    }
  }

  static omitObjectEmptyProperty (object) {
    switch (typeof (object)) {
      case 'object':
        return Underscore.omit(object, function (value) {
          return ObjectUtil.isEmpty(value)
        })
      default:
        throw new Error('omitObjectEmptyProperty param error')
    }
  }

  /**
   * 去除空格
   * @param text
   * @returns {*}
   */
  static trim (text) {
    if (typeof (text) === 'string') {
      return text.replace(/^\s*|\s*$/g, '')
    } else {
      return text
    }
  }
}

export default ObjectUtil
export { ObjectUtil }
