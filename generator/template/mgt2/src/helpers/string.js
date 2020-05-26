/*
* 随机数
* */
const random = (len) => {
  let s = ''
  while (s.length < len) {
    const r = Math.random()
    s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)))
  }
  return s
}

/*
* 获取文件后缀名
* */
const getFileSuffix = (str = '') => {
  if (!str) {
    return ''
  }
  return str.substring(str.lastIndexOf('.') + 1) // 文件后缀名
}

export { random, getFileSuffix }
