const searchConfig = {
  labelWidth: '75px',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入角色名称',
      initialValue: 'xxxrole'
    },
    {
      type: 'input',
      prop: 'leader',
      label: '权限介绍',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'select',
      prop: 'leader',
      label: '状态',
      placeholder: '请输入权限介绍',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
