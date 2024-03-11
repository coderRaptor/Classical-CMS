<template>
  <div class="modal">
    <el-dialog v-model="dialogVisble" :title="isNewRef ? '新建部门' : '编辑部门'" width="30%" center>
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门领导" />
          </el-form-item>
          <el-form-item label="选择部门" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择部门">
              <el-option v-for="item in entireDepartments" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
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
import useMainStore from '@/stores/main/main';
import { storeToRefs } from 'pinia';
import useSystemStore from '@/stores/main/system/system';

// 获取roles/departments数据
const mainStore = useMainStore()
const { entireDepartments } = storeToRefs(mainStore)
const dialogVisble = ref(false)

// 定义表单数据
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: 0
})
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
  const systemStore = useSystemStore()
  if (!isNewRef.value && editData.value) {
    // 编辑单个数据
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    // 创建新页面数据
    systemStore.newPageDataAction('department', formData)
  }
}



// 暴露方法
defineExpose({
  setModalVisble
})

</script>

<style scoped lang="less"></style>
