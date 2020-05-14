module.exports = [
  {
    displayName: '嘉会官网',
    resourceIdentity: 'website',
    handler: 'website/page',
    id: 5,
    parentId: 0,
    sortNumber: 101,
    resourceType: 1,
    children: [
      {
        displayName: '工作台',
        resourceIdentity: 'dashboard',
        handler: 'classSchedule/page',
        id: 1155,
        parentId: 5,
        sortNumber: 1111,
        resourceType: 1
      },
      {
        displayName: '课程管理',
        resourceIdentity: 'lesson_manage',
        handler: 'lesson_manage',
        id: 1156,
        parentId: 5,
        sortNumber: 1112,
        resourceType: 1,
        children: [
          {
            displayName: '课程',
            resourceIdentity: 'lesson_schedule',
            handler: 'lesson_schedule',
            id: 1155555,
            parentId: 1156,
            sortNumber: 11177,
            resourceType: 1
          }
        ]
      }
    ]
  }
]
