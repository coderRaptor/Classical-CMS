<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" />
      <h2 class="title" v-show="!isFold">coderRaptor-CMS</h2>
    </div>
    <div class="menu">
      <el-menu :collapse="isFold" :default-active="defaultActive" background-color="#001529" active-text-color="#fff"
        text-color="#b7bdc3">
        <!-- 遍历整个菜单 -->
        <template v-for="item of userMenus" :key="item.id">
          <el-sub-menu :index="String(item.id)">
            <template #title>
              <el-icon>
                <!-- 动态组件,通过is属性指定组件名 -->
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem of item.children" :key="subitem.id">
              <el-menu-item @click="handleItemClick(subitem)" :index="String(subitem.id)">{{ subitem.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login';
import { useRoute, useRouter } from 'vue-router';
import { mapPathToMenu } from '@/utils/map-menus';
import { computed } from 'vue';

// 0.定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 1.获取动态的菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
// console.log(useMenus)

// 2.监听item的点击
const router = useRouter()
function handleItemClick(item: any) {
  const url = item.url
  router.push(url)
}

// 3.ELMenu的刷新或进入mian页面的选中菜单应为当前所处路由路径对应的菜单项
const route = useRoute()
// console.log('route.fullPath', route.fullPath) //baseURL后的路径含?xxx=yyy的参数
// console.log('route.path', route.path) ////baseURL后的路径不含?xxx=yyy的参数
const defaultActive = computed(() => {
  // 点击后选中效果根据计算属性依赖的submenu.id的变化而变化
  const submenu = mapPathToMenu(route.path, userMenus)
  return submenu.id + ''
})

</script>

<style scoped lang="less">
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;

}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;

    &:hover {
      color: #fff;

    }

  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }

}
</style>
