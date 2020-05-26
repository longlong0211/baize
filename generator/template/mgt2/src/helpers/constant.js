const REQUEST_TIME_OUT = 10000 // 请求超时时间
const MESSAGE_TIME = 2500 // 提示时长
const FORM_TYPE = { // 表单类型
  EDIT: 'edit', // 编辑
  CHECK: 'check', // 查看
  CREATE: 'create' // 创建
}
const MAXIMUM_FILE_UPLOAD_LIMIT = 5 // 文件上传最大限制单位：MB

const RESOURCE_TYPE = {
  MENU: 1, // 菜单
  OPERATION: 2, // 操作
  DETAIL: 3 // 详情（？）
}

const PATH_CONFIG_WEBSITES = [ // 使用了nginx指定path去转发的子网站路由前缀（参考肿瘤子网站）
  'cancer'
]

const COMMON_PARAMS = { // 通用参数
  language: 'zh_CN', // 管理后台暂只有一种语言
  app_key: 'airahPeethiGaif8Aizo',
  terminal_type: 2
}

const APIS = { // 接口path
  ARTICLE_LIST: '/doctor/front/type/list',
  ANESTHESIA_QUESTIONNAIRE_LIST: '/app/mgt/operator/page',
  ANESTHESIA_SEND_SMS: '/app/mgt/operator/send',
  ANESTHESIA_DOWNLOAD: '/app/mgt/operator/exportExcel',
  LOGIN: '/system/login',
  LOGOUT: '/system/logout',
  OSS_PARAMS: '/system/common/file/ram-token',
  OSS_FILE_URL: '/system/common/file/url',
  DATA_DICT: '/system/data-dict/all/list',
  AUTHORITY_MENU: '/system/resource/staff/tree-menu'
}

const COOKIE_KEY = {
  USER_NAME: 'USER_NAME', // 用户名称
  JIAHUI_WEB_TOKEN: 'JIAHUI_WEB_TOKEN', // 登录token,
  LOGIN_USER_NAME: 'LOGIN_USER_NAME', // 登录用户名称
  USER_ID: 'USER_ID', // 用户id
  LOGIN_STATUS: 'LOGIN_STATUS', // 用户登录状态
  MENU_PERMISSION: 'MENU_PERMISSION' // 菜单权限
}

const LOCAL_KEY = {
  DATA_DICT: 'DATA_DICT', // 数据字典
  USER_MENUS: 'USER_MENUS', // 用户菜单
  USER_OPERATIONS: 'USER_OPERATIONS', // 用户操作
  PERMISSIONS: 'PERMISSIONS', // 用户权限列表
  TAG_VIEWS: 'TAG_VIEWS' // 快速预览记录
}

export { REQUEST_TIME_OUT, MESSAGE_TIME, FORM_TYPE, MAXIMUM_FILE_UPLOAD_LIMIT, RESOURCE_TYPE, PATH_CONFIG_WEBSITES, COMMON_PARAMS, APIS, COOKIE_KEY, LOCAL_KEY }
