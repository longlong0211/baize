/**
 *
 * @param type modal type
 * @param keyword  modal name
 * 调用方法
 * import  commonModalTitle from '../../../utils/modalUtil'
 */

export function commonModalTitle (type, keyword) { // 处理新增编辑查看在同一个页面 标题显示逻辑
  if (type === 'create') {
    return '新增' + keyword
  } else if (type === 'update') {
    return '编辑' + keyword
  } else if (type === 'check') {
    return '查看' + keyword
  }
}

export function commonModalDisable (type) { // 处理新增编辑查看在同一个页面 输入框显示逻辑
  return type === 'check'
}

export function commonImageDisable (type) { // 处理新增编辑查看在同一个页面 Upload图片上传组件 显示逻辑
  return type === 'create' || type === 'update'
}

export function commonTreeSelectDisable (status, type) {
  if (type === 'check') {
    return true
  } else {
    return status
  }
}
