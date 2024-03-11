<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '64px' : '210px'">
        <main-menu :is-fold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue';

const isFold = ref(false)
function handleFoldChange(flag: boolean) {
  isFold.value = flag
}

</script>

<style scoped lang="less">
.main-content {
  height: 100vh;

  .el-aside {
    &::-webkit-scrollbar {
      display: none;
    }

    transition: width .2s linear;
    // overflow-x: hidden;
    overflow-y: auto;
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
