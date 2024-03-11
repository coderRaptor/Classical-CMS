<template>
  <div class="header-info">
    <!-- 操作图标 -->
    <div class="operation">
      <span>
        <el-icon>
          <Message />
        </el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon>
          <ChatLineRound />
        </el-icon>
      </span>
      <span>
        <el-icon>
          <Search />
        </el-icon>
      </span>
    </div>

    <!-- 个人信息 -->
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <!-- el-avatar这里的src要使用变量引用的方式, 除非使用http直接请求, el-avatar源码是如果你写的字符串就直接保存,等打包后直接把保存字符串放到img的src中 -->
          <!-- 但是打包后的图片路径发生了改变,放回原来保存的字符串是找不到图片的 -->
          <!-- 用引用变量的方式, 这样打包后图片的路径更改了, 引用也会自动修正 -->
          <el-avatar :size="30" :src="avatar" />
          <span class="name">{{ loginStore.userInfo.name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon>
                <CircleCloseFilled />
              </el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon>
                <InfoFilled />
              </el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon>
                <Unlock />
              </el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants';
import { localCache } from '@/utils/cache';
import { useRouter } from 'vue-router';
import avatar from '@/assets/img/avatar.jpg'
import useLoginStore from '@/stores/login/login'


const router = useRouter()
function handleExitClick() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}

const loginStore = useLoginStore()

</script>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;
}

.operation {
  margin-right: 20px;
  display: inline-flex;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    i {
      font-size: 20px;
      cursor: pointer;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      width: 6px;
      height: 6px;
      background-color: red;
      border-radius: 50%;
    }
  }
}

.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      margin-left: 5px;
    }
  }
}

.info {

  // 在vue3中样式穿透请使用 :deep()
  // 为什么这里不用:deep(), 因为通过f12可见.el-dropdown-menu__item的li根本不在#app的容器中,
  // 所以根据.info往内部子组件穿透根本找不到.el-dropdown-menu__item所在的li
  // 故使用:global()全局穿透
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
