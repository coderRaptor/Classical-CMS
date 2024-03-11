const contentConfig = {
  pageName: 'menus',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单'
  },
  propsList: [
    // 如果用到树形展开数据的table,
    // 第一列不能把el-form-item的type覆盖,否则无法显示展开按钮
    // 因为其展开按钮是elementplus根据type=expand来内部判断显示的
    { label: '菜单名称', prop: 'name', width: '180px' }, //第一列, 去了type
    { label: '级别', prop: 'type', width: '120px' },
    { label: '菜单url', prop: 'url', width: '150px' },
    { label: '菜单icon', prop: 'icon', width: '200px' },
    { label: '排序', prop: 'sort', width: '120px' },
    { label: '权限', prop: 'permission', width: '150px' },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },

    { type: 'handler', label: '操作' }
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: {
      children: 'children',
      hasChildren: 'hasChildren'
    }
  }
}

export default contentConfig
