import type { IModalConfig } from '@/components/page-modal/type'

const modalConfig: IModalConfig = {
  pageName: 'role',
  header: {
    newTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      type: 'input',
      prop: 'intro',
      label: '角色权限',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'custom',
      slotName: 'menusList'
    }
  ]
}

export default modalConfig
