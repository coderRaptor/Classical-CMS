<template>
  <div class="modal">
    <el-dialog v-model="dialogVisble" :title="isNewRef ? '新建用户' : '编辑用户'" width="30%" center>
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item v-if="isNewRef" label="密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入电话号码" />
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色">
              <el-option v-for="item in entireRoles" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-select v-model="formData.department" placeholder="请选择部门">
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
const { entireDepartments, entireRoles } = storeToRefs(mainStore)
const dialogVisble = ref(false)

// 定义表单数据
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  department: ''
})
const isNewRef = ref() // 判断是否为新增触发的user-modal
const editData = ref() // 保存要编辑的用户数据, 在编辑确定按钮时使用
function setModalVisble(isNew: boolean = true, itemData?: any) {
  dialogVisble.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) { //判断为编辑按钮触发
    editData.value = itemData
    // 编辑单个用户数据
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
  if (isNewRef.value) {
    // 创建新用户
    systemStore.newUserDataAction(formData)
  } else {
    // 编辑数据
    systemStore.editUserDataAction(editData.value.id, formData)
  }
}



// 暴露方法
defineExpose({
  setModalVisble
})

</script>

<style scoped lang="less"></style>
