<template>
  <div class="dashboard">
    <!-- 1.顶部数字的数据展示 -->
    <el-row :gutter="10">
      <template v-for="item of amountList" :key="item.amount">
        <el-col :span="6" :xs="12">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 2.中间部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card header="分类商品数量(饼图)">
          <PieEchart />
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card header="不同城市商品销量">
          <map-echart />
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card header="分类商品数量(玫瑰图)">
          <rose-echart />
        </chart-card>
      </el-col>
    </el-row>

    <!-- 3.底部部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card header="分类商品销量">
          <line-echart />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card header="分类商品的收藏">
          <bar-echart />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useAnlysisStore from '@/stores/main/analysis/analysis';
import CountCard from './c-cpns/count-card/count-card.vue'
import ChartCard from './c-cpns/chart-card/chart-card.vue'
import { PieEchart, LineEchart, RoseEchart, BarEchart, MapEchart } from '@/components/page-echarts';

// 1.发起数据的请求
const anlysisStore = useAnlysisStore()
anlysisStore.fetchAnalysisDataAction()

// 2.从store获取数据
const { amountList } = storeToRefs(anlysisStore)



</script>

<style scoped lang="less">
.el-row {
  margin-bottom: 10px;
}
</style>
