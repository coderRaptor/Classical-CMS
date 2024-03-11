<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item of breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { mapPathToBreadcrumbs } from '@/utils/map-menus';
import { useRoute } from 'vue-router';
import useLoginStore from '@/stores/login/login'
import { computed } from 'vue';

const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcrumbs = computed(() => mapPathToBreadcrumbs(route.path, userMenus))
</script>

<style scoped lang="less">
.header-crumb {
  color: red;
}
</style>
