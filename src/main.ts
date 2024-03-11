import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import './assets/css/index.less'

import router from './router'
import registerStore from './stores'

import registerIcons from './global/register-icon'

// 针对ElMessage 和 ElLoading 等组件引入样式
// 1.全局引入
// import 'element-plus/dist/index.css'
// 2.组件样式引入
// import 'element-plus/theme-chalk/el-message.css'
/**
 * 3.使用vite-plugin-style-import自动导入对应组件库对应组件样式
 *    * npm install -D vite-plugin-style-import consola
 *    * 在vite.config.ts中配置
 */

// 引入mock数据执行文件
import '@/mock/'

const app = createApp(App)
app.use(registerIcons)
app.use(registerStore)
// 这里的app.use(router)一定要写在app.use(registerStore)后面
// 因为刷新mian页面时路径可能例如/main/system/user
// 这时候动态的二级路由没有注册,router的路由表只有一级路由
// 那么页面会显示not-found组件,无法匹配二级路由
// registerStore进行了pinia的安装及动态路由注册
app.use(router)
app.mount('#app')
