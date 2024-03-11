// import { localCache } from '@/utils/cache'
import hyRequest from '..'
import type { IAccount } from '@/types'
// import { LOGIN_TOKEN } from '@/global/constants'
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
    // 放到请求拦截中配置统一携带token, 不用每次请求都写一次
    // headers: {
    //   Authorization: 'Bearer' + localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
