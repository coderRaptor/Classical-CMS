import { createPinia } from 'pinia'
import useLoginStore from './login/login'
import type { App } from 'vue'

const pinia = createPinia()

function registerStore(app: App<Element>) {
  app.use(pinia)
  // pinia安装之前是不能使用例如useLoginStore的
  // 所以app.use(pinia)写在前面
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
