<template>
  <div class="department">
    <page-search :search-config="searchConfig" @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <page-content :content-config="contentConfig" ref="contentRef" @new-click="handleNewClick"
      @edit-click="handleEditClick">
      <template #leader="scope">
        <span class="leader">custom: {{ scope.row[scope.prop] }}</span>
        <span>{{ scope.tName }}</span>
      </template>

      <template #parent="scope">
        <span class="parent">custom: {{ scope.row[scope.prop] }}</span>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import { computed } from 'vue';

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import useMainStore from '@/stores/main/main';
import usePageContent from '@/hooks/usePageContent';
import usePageModal from '@/hooks/usePageModal';

// 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments) // case one
      // item.options = departments // case two
    }
  })
  return modalConfig
})

// 点击search, content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()


// 点击content, modal的操作
const { modalRef, handleNewClick, handleEditClick } = usePageModal()


</script>

<style scoped lang="less">
.leader {
  color: red;
}

.parent {
  color: skyblue;
}
</style>
