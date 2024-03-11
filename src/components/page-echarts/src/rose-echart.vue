<template>
  <div class="line-echart">
    <base-echart :option="option" />
  </div>
</template>

<script setup lang="ts">
import BaseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts';
import { computed } from 'vue';
const option = computed<EChartsOption>(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        // 内半径/外半径的大小
        radius: [10, 160],
        bottom: '-15%',
        center: ['50%', '50%'],
        roseType: 'area', // 圆心角一样, 通过半径的不同表示大小
        itemStyle: {
          borderRadius: 8
        },
        data: [
          { value: 52100, name: '上衣' },
          { value: 83500, name: '裤子' },
          { value: 60000, name: '鞋子' },
          { value: 58620, name: '厨具' },
          { value: 50105, name: '家具' },
          { value: 98920, name: '床上用品' },
          { value: 134602, name: '女装' },
        ],
        label: {
          show: false
        }
      }
    ]
  }
})


</script>

<style scoped lang="less">
.line-echart {
  color: red;
}
</style>
