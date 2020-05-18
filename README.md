# baize

结合 vue-cli3 的 preset 搭建基于 git repo 的前端项目模板

## 快速开始

```bash
# 安装 vue-cli 3.0
npm install -g @vue/cli

# 根据远程 preset 创建项目
vue create --preset 121595113/baize my-project
# or
vue create --preset direct:https://github.com/121595113/baize.git --clone my-project

# 本地预览
cd my-project && yarn run serve
```

GitLab 和 BitBucket 也是支持的。如果要从私有 repo 获取，请确保使用 --clone 选项：

```bash
vue create --preset gitlab:username/repo --clone my-project
vue create --preset bitbucket:username/repo --clone my-project
```

## 文档

```bash
# 本地预览
npm run docs:dev

# 构建部署版本
npm run docs:build
```

<!-- ## 待办

- [ ] 新增**多页**模板
- [ ] axios retry 特性 -->
