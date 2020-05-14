module.exports = {
  name: '嘉会医疗',
  prefix: 'jiahui',
  // footerText: '嘉青健康中心 JIAQING Health Center 版权所有 © 2018',
  logoSrc: 'http://static.fuyoujiankang.com/logo/wechat.png',
  logoText: '嘉会医疗',
  needLogin: false,
  debug: true,

  // 当前项目api前缀
  url: {
    dev: 'http://mgt-dev-api.jiahui.nat300.top',
    uat: process.env.API_ENV === 'development'
      ? `${window.location.origin}/api`
      : 'http://uat-api.jiahui.com/mgt'
  },

  domain: {
    dev: '.laoganma.fun',
    uat: '.jiahui.com',
    pre: '.jiahui.com',
    pre2_0: '.jiahui.com',
    production: '.jiahui.com'
  },

  preHost: 'https://api.jiahui.com/pre-mgt',
  pre2_0Host: 'https://api.jiahui.com/mgt-2',
  productHost: 'https://api.jiahui.com/mgt',
  mockHost: 'http://10.2.113.36:8002',
  // HCRM API
  HCRM_DEV_API_HOST: 'http://dev-api-jiahui.laoganma.fun/hcrm',
  HCRM_UAT_API_HOST: 'http://dev-api-jiahui.laoganma.fun/hcrm',
  HCRM_PRE_API_HOST: 'https://api.jiahui.com/pre-hcrm',
  HCRM_PRO_API_HOST: 'https://api.jiahui.com/hcrm'
}
