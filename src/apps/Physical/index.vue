<template>
  <App id="physical">
    <div class="menu">
      <ul class="menu-list">
        <li
          class="menu-item"
          :class="{active: active.menu === 'dashboard'}"
          @click="checkMenu('dashboard')"
        >
          <svg-icon data="@svg/dashboard.svg" width="22" height="22"></svg-icon>
          <span class="title">概览</span>
        </li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'server'}"
          @click="checkMenu('server')"
        >
          <svg-icon :data="icons.server" width="22" height="22"></svg-icon>
          <span class="title">服务器</span>
        </li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'network'}"
          @click="checkMenu('network')"
        >
          <svg-icon :data="icons.network" width="22" height="22"></svg-icon>
          <span class="title">网络设备</span>
        </li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'storage'}"
          @click="checkMenu('storage')"
        >
          <svg-icon :data="icons.storage" width="22" height="22"></svg-icon>
          <span class="title">服务器</span>
        </li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'datacenter'}"
          @click="checkMenu('datacenter')"
        >
          <svg-icon :data="icons.datacenter" width="22" height="22"></svg-icon>
          <span class="title">数据中心管理</span>
        </li>
      </ul>
    </div>
    <div class="content" v-if="active.menu === 'setting'">
      <div class="content-tab">
        <div
          class="tab-item"
          :class="{active: active.tab === 'group'}"
          @click="checkTab('group')"
        >监控组设置</div>
        <div
          class="tab-item"
          :class="{active: active.tab === 'alert'}"
          @click="checkTab('alert')"
        >告警设置</div>
      </div>
    </div>
    <div class="content" v-if="active.menu === 'server'">
      <vxe-table
        border
        show-header-overflow
        show-overflow
        highlight-hover-row
        :align="null"
        :data="tableData"
      >
        <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-column field="address" title="Address"></vxe-table-column>
      </vxe-table>
    </div>
    <div class="content" v-if="active.menu === 'datacenter'"></div>
  </App>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import IconServer from './assets/svg/server.svg'
import IconNetwork from './assets/svg/network.svg'
import IconStorage from './assets/svg/storage.svg'
import IconDatacenter from './assets/svg/datacenter.svg'

@Component({
  name: 'AppPhysical',
  components: {}
})
export default class extends Vue {
  private active = {
    menu: 'dashboard',
    tab: 'group'
  }

  private icons = {
    server: IconServer,
    network: IconNetwork,
    storage: IconStorage,
    datacenter: IconDatacenter
  }

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

  // 切换页面
  checkMenu (active) {
    this.active.menu = active
  }

  // 切换标签
  checkTab (tab) {
    this.active.tab = tab
  }
}
</script>

<style lang="less" scoped>
.app.physical {
  height: 100%;
  overflow: hidden;
  .app-body {
    display: flex;
    height: 100%;
    .menu {
      width: 200px;
      height: 100%;
      padding: 10px;
      border-right: 1px solid rgb(221, 221, 221);
      .menu-list {
        .menu-item {
          cursor: pointer;
          height: 40px;
          line-height: 40px;
          margin: 5px;
          padding: 0 5px;
          font-size: 14px;
          font-weight: 400;
          border-radius: 4px;
          color: #666;
          display: flex;
          align-items: center;
          .icon {
          }
          .title {
            margin-left: 12px;
          }
          &.active {
            background-color: #409eff !important;
            color: #fff;
          }
          &:hover {
            background-color: #e1f1ff;
          }
        }
      }
    }
    .content {
      flex: 1;
      padding: 0px 10px 0 15px;
    }
    .content-tab {
      font-size: 12px;
      display: flex;
      margin: 5px;
      border-left: 1px solid #eee;
      .tab-item {
        display: block;
        padding: 0 12px;
        text-align: center;
        height: 25px;
        line-height: 25px;
        border-right: 1px solid #eee;
        cursor: pointer;
        color: #666;
        &.active {
          color: #409eff !important;
        }
        &:hover {
          color: #88c7ff;
        }
      }
    }
  }
}
</style>
