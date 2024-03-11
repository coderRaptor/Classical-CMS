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
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['上衣', '裤子', '鞋子', '厨具', '家具', '床上用品', '女装']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '分类销量统计',
        type: 'line',
        stack: '总量',
        data: [52100, 83500, 60000, 58620, 50105, 98920, 134602],
        areaStyle: {},
        emphasis: {
          focus: 'series'
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
