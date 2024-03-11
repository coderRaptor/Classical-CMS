import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

type CallbackType = (data?: any) => void

function usePageModal(newCallback?: CallbackType, editCallback?: CallbackType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewClick() {
    modalRef.value?.setModalVisble()
    if (newCallback) newCallback()
  }
  function handleEditClick(itemData: any) {
    // console.log(itemData.menuData)
    modalRef.value?.setModalVisble(false, itemData)
    if (editCallback) editCallback(itemData)
  }

  return {
    modalRef,
    handleNewClick,
    handleEditClick
  }
}

export default usePageModal
