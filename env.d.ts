/// <reference types="vite/client" />

// TypeScript Vue Plugin(Volar)会导致vscode很卡,提示有时候消失
// 所以禁用了此插件, vscode就无法识别.vue文件类型
// 加上以下声明, 声明vue文件是模块, vscode就不会报错了
// declare module '*.vue' {
//   import { DefineComponent } from 'vue'
//   const component: DefineComponent
//   export default component
// }
// 2024.3.8(插件更新, Vue Language Features(Volar)合并TypeScript Vue Plugin更名为Vue-official)
// 安装此插件也不需要声明 *.vue也不会报错了

declare module '*.mjs'
