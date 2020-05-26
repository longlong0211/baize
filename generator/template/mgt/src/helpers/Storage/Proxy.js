/* manager代理 */
const managerProxy = (manager) => new Proxy(manager, {
  get (target, property) {
    const data = manager.getItem([property])
    if (data === 'undefined') {
      return undefined
    }
    if (data === undefined) {
      return manager[property]
    }
    return manager.deserialize(data)
  },
  set (target, property, value) {
    manager.setItem(property, value)
    return true
  }
})

export default managerProxy
