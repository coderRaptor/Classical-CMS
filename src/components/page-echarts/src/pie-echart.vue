<template>
  <div class="pie-echart">
    <base-echart :option="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts';

const option = computed<EChartsOption>(() => {
  return {
    // 手指放上去时显示的文本
    tooltip: {
      trigger: 'item'
    },
    // 图例:
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        bottom: '-10%',
        data: [
          { value: 52100, name: '上衣' },
          { value: 83500, name: '裤子' },
          { value: 60000, name: '鞋子' },
          { value: 58620, name: '厨具' },
          { value: 50105, name: '家具' },
          { value: 98920, name: '床上用品' },
          { value: 134602, name: '女装' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})


</script>

<style scoped lang="less">
.pie-echart {
  color: red;
}
</style>
