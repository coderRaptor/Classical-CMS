<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'
import { ref } from 'vue';

const contentRef = ref<InstanceType<typeof UserContent>>()
function handleQueryClick(form: any) {
  contentRef.value?.fetchUsersListData(form)
}

function handleResetClick() {
  contentRef.value?.fetchUsersListData()
}

const modalRef = ref<InstanceType<typeof UserModal>>()
function handleNewClick() {
  modalRef.value?.setModalVisble()
}
function handleEditClick(itemData: any) {
  // console.log(itemData)
  modalRef.value?.setModalVisble(false, itemData)
}

</script>

<style scoped lang="less">
.user {
  border-radius: 20px;
  overflow: hidden;
}
</style>
