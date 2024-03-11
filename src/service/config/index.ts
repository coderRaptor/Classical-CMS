// 第一种区分开发环境和生产环境下服务器地址的方式, 需要不断手动, 容易忘记从而泄露信息
// export const BASE_URL = 'http://codercba.com:8000'
// export const BASE_URL = 'http://codercba.production:8000'

// 第二种, 判断当前环境
// 使用vite默认提供的环境变量
// console.log(import.meta.env.MODE) // development / production
// console.log(import.meta.env.DEV)// 是否是开发环境
// console.log(import.meta.env.PROD)// 是否是生产环境
// console.log(import.meta.env.SSR)// 是否是服务端渲染(server side render)

let BASE_URL = ''
if (import.meta.env.PROD) {
  BASE_URL = 'http://localhost:5173'
} else {
  BASE_URL = 'http://localhost:5173'
}
// console.log(BASE_URL)

// 第三种, 通过创建 .env 文件直接创建变量
console.log(import.meta.env.VITE_BASE_URL)

export const TIME_OUT = 10000
export { BASE_URL }
