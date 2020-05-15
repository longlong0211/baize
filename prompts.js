module.exports = [
  {
    name: 'application',
    type: 'list',
    message: 'Choose whether your app is a PC or a mobile(default:mobile)',
    choices: [
      {
        name: 'mobile',
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
    name: 'ui-framework',
    type: 'list',
    message: 'choice UI Framework(default:none)',
    choices: [
      {
        name: 'none',
        value: 'none'
      },
      {
        name: 'Element UI',
        value: 'element-ui'
      }
    ],
    when: answers => answers.application === 'pc',
    default: 'none'
  }
];
