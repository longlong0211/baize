module.exports = [
  {
    name: 'application',
    type: 'list',
    message: '选择您的应用程序是PC还是Mobile(默认:Mobile)',
    choices: [
      {
        name: 'Mobile',
        value: 'mobile'
      },
      {
        name: 'PC',
        value: 'pc'
      }
    ],
    default: 'mobile'
  },
  {
    name: 'template',
    type: 'list',
    message: '选择模版(默认：手动配置)',
    choices: [
      {
        name: '手动配置',
        value: 'none'
      // },
      // {
      //   name: 'Mgt管理后台子应用',
      //   value: 'mgt'
      }
    ],
    when: answers => answers.application === 'mobile',
    default: 'none'
  },
  {
    name: 'template',
    type: 'list',
    message: '选择模版(默认：手动配置)',
    choices: [
      {
        name: '手动配置',
        value: 'none'
      },
      {
        name: 'Mgt管理后台子应用',
        value: 'mgt'
      }
    ],
    when: answers => answers.application === 'pc',
    default: 'none'
  },
  {
    name: 'modules',
    type: 'checkbox',
    message: '选择包含的模块',
    choices: [
      {
        name: 'Element UI',
        value: 'element-ui'
      }
    ],
    when: answers => answers.application === 'pc' && answers.template === 'none',
    default: 'none'
  // },
  // {
  //   name: 'ui-framework',
  //   type: 'list',
  //   message: 'choice UI Framework(default:none)',
  //   choices: [
  //     {
  //       name: 'none',
  //       value: 'none'
  //     },
  //     {
  //       name: 'Element UI',
  //       value: 'element-ui'
  //     }
  //   ],
  //   when: answers => answers.application === 'pc',
  //   default: 'none'
  }
];
