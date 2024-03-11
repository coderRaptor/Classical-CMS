import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
import { LOGIN_TOKEN } from '@/global/constants'

const hyRequest = new HYRequest({
  // baseURL: BASE_URL, // 为了mock数据,这里暂时注释
  timeout: TIME_OUT,
  interceptors: {
    // 请求成功后拦截把token携带过去
    requestSuccessFn(config) {
      const token = localCache.getCache(LOGIN_TOKEN)
      // 如果token和headers存在, 那么在请求头中携带授权token
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer' + token
      }
      return config
    }
  }
})

export default hyRequest
