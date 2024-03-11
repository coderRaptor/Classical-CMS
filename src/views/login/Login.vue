<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script setup lang="ts">
import LoginPanel from './c-cpns/login-panel.vue'

</script>

<style scoped lang="less">
.login {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../assets/img/login-bg.svg');
}
</style>

