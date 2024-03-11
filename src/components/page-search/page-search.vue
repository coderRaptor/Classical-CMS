<template>
  <div class="user-search">
    <el-form :model="searchForm" ref="formRef" :label-width="searchConfig.labelWidth ?? '80px'" size="large">
      <el-row :gutter="20">
        <template v-for="item of searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>

              <template v-if="item.type === 'date-picker'">
                <el-date-picker v-model="searchForm[item.prop]" type="daterange" range-separator="-"
                  start-placeholder="开始时间" end-placeholder="结束时间" size="large" />
              </template>

              <template v-if="item.type === 'select'">
                <el-select v-model="searchForm[item.prop]">
                  <template v-for="option of item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!-- 重置和查询的按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleQueryClick">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus';
import { reactive, ref } from 'vue';

// 定义自定义事件/接收的属性
interface IProps {
  searchConfig: {
    labelWidth?: string
    formItems: any[]
  }
}
const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<IProps>()
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
// 定义form的数据
const searchForm = reactive(initialForm)
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  formRef.value?.resetFields()
  emit('resetClick')
}

function handleQueryClick() {
  emit('queryClick', searchForm)
}

</script>

<style scoped lang="less">
.user-search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
