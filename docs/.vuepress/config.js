module.exports = {
  base: '/baize/',
  serviceWorker: true,
  title: '白泽 说明文档',
  head: [
    ['link', { rel: 'icon', href: './favicon.ico' }]
  ],
  themeConfig: {
    sidebar: 'auto',
    repo: 'https://github.com/121595113/baize',
    docsDir: 'docs',
    serviceWorker: {
      updatePopup: true
    }
  }
}
