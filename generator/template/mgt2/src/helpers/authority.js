import _ from 'lodash'
import Storage from '../helpers/Storage'
import { LOCAL_KEY } from './constant'

const { USER_OPERATIONS, PERMISSIONS, USER_MENUS } = LOCAL_KEY

/*
* 从接口返回的资源获取用户菜单、操作数据
* 参数：（源数据, 资源类型）
* */
const fetchUserResourcesFromRawData = (rawData = [], type) => {
  let resources = []
  const filteredMenus = rawData.filter(menu => menu.resourceType === type)
  filteredMenus.forEach(menu => {
    if (!menu.parentId) {
      resources.unshift(menu)
    } else {
      resources.push(menu)
    }
  })
  return resources
}

/*
* 获取路由路径（去除url上的query和params参数）
* */
const excludePathParams = (route) => {
  const { fullPath, params = {} } = route
  let excludedPath = fullPath
  let paramsValue = _.isEmpty(params) ? '' : _.values(params)[0] // 获取params的第一个参数值
  if (paramsValue) {
    excludedPath = excludedPath.substring(0, excludedPath.lastIndexOf('/' + paramsValue))
  }
  if (excludedPath.lastIndexOf('?') !== -1) {
    excludedPath = excludedPath.substring(0, excludedPath.lastIndexOf('?'))
  }
  return excludedPath
}

/*
* 验证路由权限
* */
const verifyRoutePermission = (route) => {
  if (_.isEmpty(route)) {
    return false
  }
  const routePath = excludePathParams(route)
  const permissions = Storage.local[PERMISSIONS] || []
  return permissions.some(item => item === routePath)
}

/*
* 验证操作权限
* */
const verifyOperationPermission = (operationKey = '') => {
  if (!operationKey) {
    return true
  }
  const operations = Storage.local[USER_OPERATIONS] || []
  return operations.some(item => item.resourceIdentity === operationKey)
}

/*
* 通过路径获取资源title
* */
const getResourceTitleByRoute = (route) => {
  const purePath = excludePathParams(route)
  if (purePath === '/') {
    return '首页'
  }
  const resourcePaths = purePath.split('/')
  const resourcePath = resourcePaths[resourcePaths.length - 1]
  const resource = Storage.local[USER_MENUS].find(item => item.resourceIdentity === resourcePath)
  return resource.displayName
}

export { fetchUserResourcesFromRawData, excludePathParams, verifyRoutePermission, verifyOperationPermission, getResourceTitleByRoute }
