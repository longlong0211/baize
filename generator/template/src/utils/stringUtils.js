import _ from 'lodash'
// 供使用者调用
export function trim (s) {
  return trimRight(trimLeft(s))
}
// 去掉左边的空白
function trimLeft (s) {
  if (s == null) {
    return ''
  }
  const whitespace = String(' \t\n\r')
  let str = String(s)
  if (whitespace.indexOf(str.charAt(0)) !== -1) {
    let j = 0
    const i = str.length
    while (j < i && whitespace.indexOf(str.charAt(j)) !== -1) {
      j++
    }
    str = str.substring(j, i)
  }
  return str
}

// 去掉右边的空白
function trimRight (s) {
  if (s == null) return ''
  const whitespace = String(' \t\n\r')
  let str = String(s)
  if (whitespace.indexOf(str.charAt(str.length - 1)) !== -1) {
    let i = str.length - 1
    while (i >= 0 && whitespace.indexOf(str.charAt(i)) !== -1) {
      i--
    }
    str = str.substring(0, i + 1)
  }
  return str
}

/**
 * 判断是否为空 undefined ,null, ''
 * @param {*} s 目标值
 * @return {boolean} TRUE 为空 FALSE 不为空
 */
export function isEmpty (s) {
  if (s === undefined || s === null || s === '') {
    return true
  }
  return false
}

/**
 * 格式化参数
 * @param {*} params  参数      {name:admin, password:123}
 * @returns {object}   'name=admin&password=123'
 */
export function formatParams (params) {
  let formData = []
  const undefinedKeys = []

  for (const property in params) {
    const encodedKey = encodeURIComponent(property)

    // 参数值 去空格
    const uncodedValue = trim(params[property])
    const encodedValue = encodeURIComponent(uncodedValue)

    if (params[property] === undefined || typeof (params[property]) === 'undefined') {
      undefinedKeys.push(property)
    } else {
      // 去掉空格

      formData.push(encodedKey + '=' + encodedValue)
    }
  }

  formData = formData.join('&')

  return { formData: formData, undefinedKeys: undefinedKeys }
}

/**
 * 将locatin.search处理成一个对象
 * @param {string} search 参数
 * @return {object} result
 */
export function locationSearchParse (search) {
  if (search && search.indexOf('?') !== -1) {
    const str = search.substring(1, search.length)
    const _array = str.split('&') || []
    const result = {}
    _array.map(item => {
      const tempArray = item.split('=')
      result[tempArray[0]] = tempArray[1]
    })
    return result
  } else {
    return ''
  }
}

/**
 * 标准数字格式检测
 */
const NUMBER_REGEX = /[+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*)(?:[eE][+-]?\d+)?/

/**
 * 格式化数字，保留指定位数
 * @export
 * @param {(number | string)} num 需要格式化的数据,或形如 '12,000.00'或'-1.2345'
 * @param {number} [digits=2] 需要保留的小数位数
 * @returns {number} 格式化后的数字
 */
export function trimNum (num, digits = 2) {
  let n = 0
  if (isNaN(Number(num)) || (!num && num !== 0)) return 0

  if (typeof num === 'number') {
    n = num
  } else if (typeof num === 'string') {
    const parsed = num.replace(/,/g, '')

    // 检测形如'-1.2345'的标准数字格式
    if (NUMBER_REGEX.test(parsed)) {
      n = parseFloat(parsed)
      if (isNaN(n)) return 0
    } else {
      return 0
    }
  } else {
    return 0
  }

  // const multi = Math.pow(10, digits)
  // const _sign = (n < 0) ? -1 : 1
  // const precision = (n * multi * 100).toString().replace(/[+-.]/g, '').length
  return _.round(n, digits)
  // return Math.round((n * multi * _sign).toPrecision(precision)) / multi * _sign
}

/**
 * 指定数字小数位数的字符串格式
 *
 * @export
 * @param {(number | string)} num 需要格式化的数据,或形如 '12,000.00'或'-1.2345'
 * @param {number} [digits=2] 需要保留的小数位数
 * @returns {string} 指定数字小数位数的字符串格式
 */
export function formatNum (num, digits = 2) {
  return trimNum(num, digits).toFixed(digits).toString()
}

/**
 * 将指定数字转成千分位分隔的货币格式
 *
 * @export
 * @param {(number | string)} num 需要格式化的数据,或形如 '12,000.00'或'-1.2345'
 * @param {number} [digits=2] 需要保留的小数位数
 * @returns {string} 指定数字的货币格式
 */
export function toCurrency (num, digits = 2) {
  const numTrimmed = trimNum(num, digits)
  if (numTrimmed === 0) return numTrimmed.toFixed(digits).toString()
  return numTrimmed.toFixed(digits).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}

/**
   * @description UUID算法生成唯一ID
   * @typedef {string} createTaskUuid
   *
   * @return {string}
   */
export function createTaskUuid () {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + (Math.random() * 16)) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16)
  })
  return uuid
}
