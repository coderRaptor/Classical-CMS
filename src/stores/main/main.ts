import {
  getEntireRoles,
  getEntireDepartment,
  getEntireMenus
} from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}
const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    async fetchEntireDataAction() {
      try {
        const rolesResult = await getEntireRoles()
        const departmentResult = await getEntireDepartment()
        const menusResult = await getEntireMenus()
        // console.log(rolesResult, departmentResult, menusResult)

        // 保存数据
        this.entireRoles = rolesResult.data.list
        this.entireDepartments = departmentResult.data.list
        this.entireMenus = menusResult.data.list
      } catch (error) {
        console.log(error)
      }
    }
  }
})

export default useMainStore
