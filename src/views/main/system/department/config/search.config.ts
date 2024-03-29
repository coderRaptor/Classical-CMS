const searchConfig = {
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入查询的部门名称',
      initialValue: 'aaa'
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入查询的领导名称',
      initialValue: ''
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间',
      initialValue: ''
    }
  ]
}

export default searchConfig
