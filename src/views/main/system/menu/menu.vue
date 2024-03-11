<template>
  <div class="menu">
    <page-content :content-config="contentConfig" />
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content/page-content.vue';
import contentConfig from './config/content.config'
</script>

<style scoped lang="less"></style>
