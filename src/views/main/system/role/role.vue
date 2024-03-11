<template>
  <div class="role">
    <page-search :search-config="searchConfig" @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <page-content :content-config="contentConfig" ref="contentRef" @new-click="handleNewClick"
      @edit-click="handleEditClick" />
    <page-modal :modal-config="modalConfig" :other-info="otherInfo" ref="modalRef">
      <template #menusList>
        <el-tree ref="treeRef" :data="entireMenus" show-checkbox node-key="id" highlight-current
          :props="{ children: 'children', label: 'name' }" @check="handleElTreeClick" />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import PageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewClick, handleEditClick } = usePageModal(newCallback, editCallback)

import { storeToRefs } from 'pinia'
import useMainStore from "@/stores/main/main";
import { nextTick, ref } from 'vue';
import type { ElTree } from 'element-plus'
import { mapMenuListToIds } from '@/utils/map-menus'

// 获取完整的菜单
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})
const treeRef = ref<InstanceType<typeof ElTree>>()

// 点击复选框触发
function handleElTreeClick(data1: any, data2: any) {
  const menuData = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuData }
}

// 用于回显当前角色权限的复选框状态
function editCallback(itemData: any) {
  // console.log('点击了编辑', itemData.menuData)
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuData)
    // console.log('menuIds', menuIds)
    // 等待弹窗渲染出来后再执行
    treeRef.value?.setCheckedKeys(menuIds)
  })
}


// 解决点了编辑后再点击新建时复选框有勾选的问题
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}

</script>

<style scoped lang="less"></style>
