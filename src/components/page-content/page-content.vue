<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" @click="handleNewUserClick">{{ contentConfig.header?.btnTitle ?? '新建数据' }}</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item of contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button @click="handleEditBtnClick(scope.row)" size="small" type="primary" icon="Edit"
                  text>编辑</el-button>
                <el-button @click="handleDeleteBtnClick(scope.row.id)" size="small" type="danger" icon="Delete"
                  text>删除</el-button>
              </template>
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop" tName="raptor"></slot>
              </template>
            </el-table-column>
          </template>

          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>

      </el-table>
    </div>
    <div class="pagination">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
        size="small" layout="sizes, prev, pager, next, jumper, total" :total="pageTotalCount"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system/system';
import { formatUTC } from '@/utils/format';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string,
      btnTitle?: string
    }
    propsList: any[],
    childrenTree?: {
      rowKey: string,
      treeProps: {
        children: string,
        hasChildren: string
      }
    }
  }
}
const props = defineProps<IProps>()
const emit = defineEmits(['newClick', 'editClick'])

// 1.发出action请求数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
// 订阅action, 把页码改回 1
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (name === ('deletePageByIdAction' || 'editPageDataAction' || 'newPageDataAction')) {
      currentPage.value = 1
    }
  })
})
fetchPageListData()
function fetchPageListData(formData: any = {}) {
  // 1.获取offset、size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 2.发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 2.获取pageList数据进行展示（转成响应式）
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 3.页码相关的逻辑


function handleCurrentChange() {
  fetchPageListData()
}

function handleSizeChange() {
  fetchPageListData()
}

// 点击删除按钮
function handleDeleteBtnClick(id: string | number) {
  // console.log('点击删除按钮', id)
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}

// 新建用户的操作
function handleNewUserClick() {
  emit('newClick')
}

// 编辑操作
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

defineExpose({
  fetchPageListData
})


</script>

<style scoped lang="less">
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0px;
    padding: 5px 8px;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
