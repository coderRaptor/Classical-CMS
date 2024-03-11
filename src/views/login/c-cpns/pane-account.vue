<template>
  <div class="pane-account">
    <el-form ref="formRef" :model="account" :rules="accountRules" status-icon label-width="60px" size="large">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/stores/login/login'
import type { IAccount } from '@/types';
import { localCache } from '@/utils/cache';

// 这两个常量没必要放到 global的constants 里面, 因为只有这个组件用到这两个常量
const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

// 1.表单数据account

const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

// 2.定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/i, message: '必须是6~20个数字或字母组成', trigger: 'change' }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/i, message: '必须是3位以上的数字或字母组成', trigger: 'change' }
  ]
}

// 3.执行帐号登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log('验证成功', '登录操作')
      const name = account.name
      const password = account.password
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 判断是否需要记住密码
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('Oops, 请输入正确格式后再操作~')
    }
  })
}

defineExpose({
  loginAction
})

</script>

<style scoped lang="less">
.pane-account {
  color: red;
}
</style>
