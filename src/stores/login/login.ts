import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import { mapMenusToRoutes } from '@/utils/map-menus'
import useMainStore from '../main/main'

// 可以上网通过工具如 json to typescript 转化成ts类型复制过来
// 这里暂时直接用 any
interface ILoginState {
  token: string
  userInfo: any
  userMenus: any[]
}

const useLoginStore = defineStore('login', {
  // 如何指定state的类型
  // 1.defineStore后指定泛型
  // 2.给state函数单独指定
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.帐号登录， 获取token信息
      const loginResult: any = await accountLoginRequest(account)
      // console.log(loginResult)
      if (loginResult.success) {
        const id = loginResult.data.id
        // const name = loginResult.data.name
        this.token = loginResult.data.token
        // 2.进行本地缓存token
        localCache.setCache(LOGIN_TOKEN, this.token)

        // 3.获取登录用户的详细信息(role信息)
        const userInfoResult = await getUserInfoById(id)
        // console.log('userInfoResult', userInfoResult)
        this.userInfo = userInfoResult.data
        // console.log(this.userInfo)
        // console.log(this.userInfo.role)

        // 4.根据角色请求用户的权限(菜单menus)
        const userMenusResult = await getUserMenusByRoleId(
          this.userInfo.role.id
        )
        // console.log('userMenusResult', userMenusResult)
        this.userMenus = userMenusResult.data

        // 进行本地缓存
        localCache.setCache('userInfo', this.userInfo)
        localCache.setCache('userMenus', this.userMenus)

        // 请求所有roles/department/menus数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 动态获取所有路由对象,放到数组中
        const routes = mapMenusToRoutes(this.userMenus)
        // 注册路由
        routes.forEach((route) => router.addRoute('main', route))

        // 4. 页面跳转(跳转到main页面)
        router.push('/main')
      }
    },

    // 用于防止用户在main页面进行刷新时store数据的丢失、重新注册动态路由
    // 刷新时重新在localStorage读取数据, 因为刷新store的数据是消失的要重新获取
    // 此函数的刷新执行放在了入口mian.ts中
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
      }

      // 刷新时获取最新的role/department/menus数据
      // 可以不用缓存, 每次刷新拿最新的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 刷新后main页面动态注册的路由会消失,因为之前只做了登录时动态注册路由
      // 这里重新注册防止在mian页面刷新之前动态路由丢失问题
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))
    }
  }
})

export default useLoginStore
