<template>
  <div class="modal">
    <el-dialog v-model="dialogVisble" :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%" center>
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item of modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">

              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>

              <template v-if="item.type === 'date-picker'">
                <el-date-picker v-model="formData[item.prop]" type="daterange" range-separator="-"
                  start-placeholder="开始时间" end-placeholder="结束时间" size="large" />
              </template>

              <template v-if="item.type === 'select'">
                <el-select v-model="formData[item.prop]">
                  <template v-for="option of item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>

              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisble = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useSystemStore from '@/stores/main/system/system';
import type { IModalProps } from './type';

// 获取roles/departments数据
const dialogVisble = ref(false)

const props = defineProps<IModalProps>()

// 定义表单数据
const initialForm: any = {}
for (const item of props.modalConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialForm)
const isNewRef = ref() // 判断是否为新增触发的user-modal
const editData = ref() // 保存要编辑的用户数据, 在编辑确定按钮时使用
function setModalVisble(isNew: boolean = true, itemData?: any) {
  dialogVisble.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) { //判断为编辑按钮触发
    editData.value = itemData
    // 编辑页面数据
    for (const key in itemData) {
      if (Object.prototype.hasOwnProperty.call(itemData, key)) {
        formData[key] = itemData[key]; //回显数据
      }
    }
  } else { //判断为新建用户按钮触发
    editData.value = null
    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        formData[key] = ''
      }
    }
  }
}

function handleConfirmClick() {
  dialogVisble.value = false

  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...formData, ...props.otherInfo }
  }

  const systemStore = useSystemStore()
  if (!isNewRef.value && editData.value) {
    // 编辑单个数据
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, infoData)
  } else {
    // 创建新页面数据
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  }
}



// 暴露方法
defineExpose({
  setModalVisble
})

</script>

<style scoped lang="less"></style>
