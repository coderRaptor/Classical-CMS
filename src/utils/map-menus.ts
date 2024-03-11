import type { RouteRecordRaw } from 'vue-router'
function loadLocalRoutes() {
  // 路由对象都在独立的文件中
  // 从文件中将所有路由对象先读取到数组中
  const localRoutes: RouteRecordRaw[] = []
  // 读取router/main所有的ts文件
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })
  // 将加载的对象放到localRoutes
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}
// 记录该角色拥有的菜单当中的第一个菜单项
export let firstMenu: any = null
// 基于菜单的动态路由做法
// 函数作用: 角色拥有的菜单 =>(映射) 路由对象[]
export function mapMenusToRoutes(userMenus: any[] = []) {
  // console.log(userMenus)
  // 获取本地路由对象数组
  const localRoutes = loadLocalRoutes()
  // 根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 给route的顶层菜单增加重定向功能(但只需要添加一项即可)
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}
/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) return submenu
    }
  }
}

interface IBreadcrumbs {
  name: string
  path: string
}
// 映射面包屑
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadcrumbs[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 *
 * @param menuData 当前角色拥有的菜单对象的数组
 * @returns 当前角色拥有的菜单对象映射出的id数组(不含父级菜单id)
 */
export function mapMenuListToIds(menuData: any[]) {
  const ids: (number | string)[] = []

  function recurseGetId(menuData: any[]) {
    for (const item of menuData) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }

  recurseGetId(menuData)

  return ids
}
