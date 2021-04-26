<template>
  <div class="app-resource instance">
    <div>
      <ac-button type="primary">新建云服务器</ac-button>
      <ac-button style="margin-left: 6px;">转移</ac-button>
      <ac-button style="margin-left: 6px;">开机</ac-button>
      <ac-button style="margin-left: 6px;">关机</ac-button>
      <ac-button style="margin-left: 6px;">重启</ac-button>
    </div>
    <vxe-table
      show-header-overflow
      show-overflow
      highlight-hover-row
      :align="null"
      :data="tableData"
      style="margin-top: 12px;"
    >
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
@Component({
  name: 'AppResourceInstance',
  components: {}
})
export default class extends Vue {
  private tableData: any = [
    {
      id: 10001,
      name: 'Test1',
      role: 'Develop',
      sex: 'Man',
      age: 28,
      address: 'vxe-table 从入门到放弃'
    },
    {
      id: 10002,
      name: 'Test2',
      role: 'Test',
      sex: 'Women',
      age: 22,
      address: 'Guangzhou'
    },
    {
      id: 10003,
      name: 'Test3',
      role: 'PM',
      sex: 'Man',
      age: 32,
      address: 'Shanghai'
    },
    {
      id: 10004,
      name: 'Test4',
      role: 'Designer',
      sex: 'Women ',
      age: 24,
      address: 'Shanghai'
    }
  ]
}
</script>

<style lang="less" scoped>
</style>
