<template>
  <div class="line-echart">
    <base-echart :option="option" />
  </div>
</template>

<script setup lang="ts">
import BaseEchart from './base-echart.vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts';
import { computed } from 'vue';
const option = computed<EChartsOption>(() => {
  return {
    title: {
      text: '支持鼠标滚动缩放',
    },
    grid: {
      bottom: '5%'
    },
    xAxis: {
      data: ['上衣', '裤子', '鞋子', '厨具', '家具', '床上用品', '女装'],
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      z: 10
    },
    yAxis: {
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        // 系列图形的样式(每个item的样式)
        // 可以被放到每一项中,针对每一项设置
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: [52100, 83500, 60000, 58620, 50105, 98920, 134602]
      }
    ]
  };
})



</script>

<style scoped lang="less">
.line-echart {
  color: red;
}
</style>
