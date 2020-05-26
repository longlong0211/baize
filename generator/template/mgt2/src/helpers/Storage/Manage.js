class Manage {
  constructor (storage) {
    this.storage = storage || window.localStorage
    this.getAll = this.getAll.bind(this)
    this.getItem = this.getItem.bind(this)
    this.setItem = this.setItem.bind(this)
    this.forEach = this.forEach.bind(this)
    this.keys = this.keys.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.clear = this.clear.bind(this)
  }
  get length () {
    return this.storage.length
  }
  set length (l) {
    this.length = this.storage.length
  }
  /*
  * @return {Array} storage中存储的所有key
  * */
  keys () {
    const keys = []
    for (let i = 0; i < this.storage.length; i++) {
      keys.push(this.storage.key(i))
    }
    return keys
  }
  /*
  * @param {Function} handler 每一项的handler
  * @return {Array} storage中存储的所有key
  * */
  forEach (handler = () => {}) {
    this.keys().forEach(item => {
      handler(item, this.storage[item])
    })
  }
  /*
  * @param {Any} value 任何可被序列化的值
  * @return {String} 序列化后的字符串
  * */
  serialize (value) {
    return JSON.stringify(value)
  }
  /*
  * @param {String} value 用于被反序列化的字符串
  * @param {Any} defaultValue value为空或undefined时的
  * @return {Any} 反序列化后的数据
  * */
  deserialize (value, defaultValue = undefined) {
    if (!value) { return defaultValue }
    let val = ''
    try { val = JSON.parse(value) } catch (e) { val = value }
    return (val !== undefined ? val : defaultValue)
  }
  /*
  * @param {String} key 存储值的key
  * @param {Any} defaultValue 给定key获取不到时的值，默认undefined
  * @return {Any} 序列化后给定key的值
  * */
  getItem (key, defaultValue = undefined) {
    const data = this.storage.getItem(key)
    return this.deserialize(data, defaultValue)
  }
  /*
  * @param {Any} defaultValue 给定key获取不到时的值，默认undefined
  * @return {Any} 序列化后给定key的值
  * */
  getAll (defaultValue = undefined) {
    let keys = this.keys()
    if (keys.length === 0) { return defaultValue }
    let data = {}
    keys.forEach(key => {
      let value = this.getItem(key)
      data[key] = value === 'undefined' ? undefined : value
    })
    return data
  }
  /*
  * @param {String} key 存储值的key
  * @param {Any} value 除undefined外要存储的值
  * @return {Any} value 存储的值
  * */
  setItem (key, value) {
    this.storage.setItem(key, this.serialize(value))
    return value
  }
  /*
  * @param {String} key 要移除的key
  * @return {Any} 移除项的值，如果没有指定key的值则返回undefined
  * */
  removeItem (key) {
    let value = this.getItem(key)
    this.storage.removeItem(key)
    return value
  }
  /*
  * 清除所有存储的数据
  * @return {Undefined}
  * */
  clear () {
    this.storage.clear()
  }
}

export { Manage }
