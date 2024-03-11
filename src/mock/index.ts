// 引入mockjs模块
import Mock from 'mockjs'
import login from './login.json'
import login2 from './login2.json'
import userMenus from './userMenus.json'
import userMenus2 from './userMenus2.json'
import usersList from './system/usersList.json'
import departments from './system/departments.json'
import menusList from './system/menusList.json'
import roleList from './system/roleList.json'
import amountList from './anlysis/amountList.json'
import { v4 as uuidv4 } from 'uuid'
// import { BASE_URL } from '@/service/config'
Mock.setup({
  timeout: 400 //设置延时, 因为请求必然花费时间
})

// 登录接口
Mock.mock(`/login`, 'post', (params) => {
  // console.log(params)
  const options = JSON.parse(params.body)
  // console.log(options)
  const { name, password } = options
  if (name === 'coderRaptor') {
    if (password === '123456') {
      return {
        code: 0,
        success: true,
        data: login
      }
    }
  }
  if (name === 'coderDemo') {
    if (password === '123456') {
      // console.log('coderDemo')
      return {
        code: 0,
        success: true,
        data: login2
      }
    }
  }
  return {
    code: 0,
    success: false,
    message: '登录失败'
  }
})

// 获取用户身份(id等等)接口
Mock.mock(/^\/users\/\d$/, 'get', (params) => {
  // console.log('getUserInfoById', params)
  const id = params.url.split('/').at(-1)
  // console.log(id)
  return {
    code: 0,
    data: {
      cellphone: 15302387368,
      createAt: '2024-02-16T10:14:24.00Z',
      department: {
        id,
        name: '总裁办',
        parentId: null
      },
      enable: 1,
      id,
      name: 'coderRaptor',
      realname: 'coderRaptor',
      role: {
        id,
        name: '超级管理员',
        intro: '所有权限'
      },
      updateAt: '2024-02-16T10:20:24.00Z'
    }
  }
})

// 根据用户身份对应权限获取其拥有的菜单的接口
Mock.mock(/^\/role\/\d\/menu$/, 'get', (params) => {
  const id = params.url.split('/')[2] // 拿到\d代表的id
  // console.log(id)
  if (id === '1') {
    return {
      code: 0,
      data: userMenus
    }
  } else if (id === '2') {
    return {
      code: 0,
      data: userMenus2
    }
  } else {
    return {
      code: 0,
      success: false,
      message: '没有权限'
    }
  }
})

// 获取用户列表接口
// 此处未做查询结果返回
Mock.mock('/users/list', 'post', (params) => {
  const { offset, size } = JSON.parse(params.body)
  // console.log(offset, size)
  // console.log(params.body)
  const usersListLength = usersList.length
  const tempSize = usersListLength - offset < size ? usersListLength : size
  const resultArr = usersList.slice(offset, tempSize)
  // console.log(resultArr)
  return {
    code: 0,
    data: {
      list: resultArr,
      totalCount: usersListLength
    }
  }
})

// 获取角色列表接口
// 此处未做查询结果返回
Mock.mock('/role/list', 'post', () => {
  return {
    code: 0,
    data: {
      list: roleList
    }
  }
})

// 获取部门列表接口
// 此处未做条件限制的查询结果返回
Mock.mock('/department/list', 'post', () => {
  return {
    code: 0,
    data: {
      list: departments,
      totalCount: departments.length
    }
  }
})

// 获取菜单列表
Mock.mock('/menus/list', 'post', () => {
  return {
    code: 0,
    data: {
      list: menusList,
      totalCount: menusList.length
    }
  }
})

// 新增用户接口
// 由于没用数据库, 刷新会丢失, 这里不采用sessionStorage和localStorage
Mock.mock('/users', 'post', (params) => {
  const body = JSON.parse(params.body)
  // console.log(body)
  const ISOTimeStr = new Date().toISOString()
  const data = {
    ...body,
    createAt: ISOTimeStr,
    updateAt: ISOTimeStr,
    enable: 1,
    id: uuidv4(),
    departmentId: uuidv4(),
    roleId: uuidv4()
  }
  usersList.unshift(data)
  return {
    code: 0,
    data
  }
})

//新增部门接口
Mock.mock('/department', 'post', (params) => {
  const body = JSON.parse(params.body)
  // console.log(body)
  const ISOTimeStr = new Date().toISOString()
  const data = {
    ...body,
    createAt: ISOTimeStr,
    updateAt: ISOTimeStr,
    id: uuidv4()
  }
  departments.unshift(data)
  return {
    code: 0,
    data
  }
})

// 新增角色接口
Mock.mock('/role', 'post', (params) => {
  const body = JSON.parse(params.body)
  const menusId = body.menuData
  // console.log(menusId)
  const menusResult: any[] = []

  // 递归搜寻匹配前端传递过来的菜单id,返回对应对象
  function recurseGetMenus(menus: any[], id: number | string) {
    for (const item of menus) {
      if (String(id) === String(item.id)) {
        return item
      } else if (item.children) {
        const hasItem: any = recurseGetMenus(item.children, id)
        if (hasItem) {
          return hasItem
        } else {
          continue
        }
      }
    }
  }
  menusId.forEach((menuId: number | string) => {
    const menu = recurseGetMenus(menusList, menuId)
    // console.log('result', menu)
    if (!menu.children) menusResult.push(menu)
  })
  // console.log('menusResult', menusResult)

  const ISOTimeStr = new Date().toISOString()
  const data = {
    ...body,
    menuData: menusResult,
    createAt: ISOTimeStr,
    updateAt: ISOTimeStr,
    id: uuidv4()
  }
  roleList.unshift(data)
  return {
    code: 0,
    data
  }
})

// 删除用户接口
Mock.mock(/\/users\/[^/]+$/, 'delete', (params) => {
  const id = params.url.split('/').at(-1)
  // console.log(id)
  usersList.forEach((user, index) => {
    String(user.id) === id ? usersList.splice(index, 1) : ''
  })
  // console.log(usersList)
  return {
    code: 0,
    message: `删除了id为${id}的用户`
  }
})

// 删除部门接口
Mock.mock(/\/department\/[^/]+$/, 'delete', (params) => {
  const id = params.url.split('/').at(-1)
  // console.log(id)
  departments.forEach((department, index) => {
    String(department.id) === id ? departments.splice(index, 1) : ''
  })
  // console.log(usersList)
  return {
    code: 0,
    message: `删除了id为${id}的部门`
  }
})

// 编辑用户接口
Mock.mock(/\/users\/\d/, 'patch', (params) => {
  const user = JSON.parse(params.body)
  usersList.forEach((item, index) => {
    if (String(item.id) === String(user.id)) {
      usersList[index] = {
        ...item,
        ...user,
        updateAt: new Date().toISOString()
      }
    }
  })
  return {
    code: 0,
    message: '编辑用户成功'
  }
})

// 编辑部门接口
Mock.mock(/\/department\/\d/, 'patch', (params) => {
  const department = JSON.parse(params.body)
  departments.forEach((item, index) => {
    if (String(item.id) === String(department.id)) {
      departments[index] = {
        ...item,
        ...department,
        updateAt: new Date().toISOString()
      }
    }
  })
  return {
    code: 0,
    message: '编辑部门成功'
  }
})

// 商品统计相关接口
Mock.mock('/goods/amount/list', 'get', () => {
  return {
    code: 0,
    data: amountList
  }
})
