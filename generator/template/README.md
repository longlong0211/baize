# jiahui-mgt

## Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

### commit

```bash
npm run commit
```

### react迁移vue

- [x] 项目初始化
- [x] 乾坤配置
- [x] 环境变量设置
- [x] router
- [x] store
- [ ] utils
- [x] http方法
- [x] 权限系统
- [x] layout
  - [x] header
  - [x] aside
  - [x] main
- [ ] system 登录
  - [x] /login
  - [x] /resetPassword
  - [x] /403
  - [x] /404
- [ ] 按菜单router模块迁移
  - [ ] 嘉会医疗小程序
    - [x] /appointment/notice小程序首页公告
    - [x] /appointment/userManage用户管理
    - [x] /appointment/bookingManage预约管理

### 目录结构调整映射关系

原文件 | 调整后 | 备注
---|---|---
src/utils/config | src/config/config
src/helpers/constant | src/const/constant | src/const(引用方式)
src/helpers/Constants | src/const/Constants| src/const(引用方式)

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
