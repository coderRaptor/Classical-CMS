import {
  deletePageById,
  deleteUserById,
  editUserData,
  editPageData,
  newUserData,
  newPageData,
  postPageListData,
  postUsersListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    // 查询用户列表action
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { list, totalCount } = usersListResult.data
      ;(this.usersList = list), (this.usersTotalCount = totalCount)
    },
    // 新建用户action
    async newUserDataAction(userInfo: any) {
      // 创建新用户
      const newResult = await newUserData(userInfo)
      console.log(newResult) //服务器返回新用户的信息
      // 重新请求用户列表获取最新
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    // 删除用户action
    async deleteUserByIdAction(id: number | string) {
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)
      // 重新请求用户列表获取最新
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    // 编辑数据action
    async editUserDataAction(id: number | string, userInfo: any) {
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)
      // 重新请求用户列表获取最新
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    // 以上action可以进行重构成使用下面的通用接口, 但是留下来做个对比
    /** 针对页面的数据: 增删改查 */
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { list, totalCount } = pageListResult.data
      // console.log(list, totalCount)
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number | string) {
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)
      // 重新请求pageName页面列表数据获取最新
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      console.log(newResult)
      this.postPageListAction(pageName, { offsest: 0, size: 10 })
    },
    async editPageDataAction(
      pageName: string,
      id: number | string,
      pageInfo: any
    ) {
      const editResult = await editPageData(pageName, id, pageInfo)
      console.log(editResult)
      // 重新请求页面列表获取最新
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
