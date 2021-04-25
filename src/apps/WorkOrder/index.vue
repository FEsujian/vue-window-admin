<template>
  <div class="app work-order">
    <div class="app-body">
      <div class="menu">
        <ul class="menu-list">
          <li
            class="menu-item"
            :class="{active: active.menu === 'pending'}"
            @click="checkMenu('pending')"
          >
            <svg-icon :data="icons.pending" width="22" height="22"></svg-icon>
            <span class="title">我的待办</span>
          </li>
          <li
            class="menu-item"
            :class="{active: active.menu === 'done'}"
            @click="checkMenu('done')"
          >
            <svg-icon :data="icons.done" width="22" height="22"></svg-icon>
            <span class="title">我的已办</span>
          </li>
          <li
            class="menu-item"
            :class="{active: active.menu === 'started'}"
            @click="checkMenu('started')"
          >
            <svg-icon :data="icons.started" width="22" height="22"></svg-icon>
            <span class="title">我发起的工单</span>
          </li>
          <li
            class="menu-item"
            :class="{active: active.menu === 'flow'}"
            @click="checkMenu('flow')"
          >
            <svg-icon :data="icons.flow" width="22" height="22"></svg-icon>
            <span class="title">工单流程定义</span>
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
      <div class="content" v-if="active.menu === 'dashboard'"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import IconPending from './assets/svg/pending.svg'
import IconDone from './assets/svg/done.svg'
import IconStarted from './assets/svg/started.svg'
import IconFlow from './assets/svg/flow.svg'
@Component({
  name: 'AppWorkOrder',
  components: {}
})
export default class extends Vue {
  private active = {
    menu: 'pending',
    tab: 'group'
  }

  private icons = {
    pending: IconPending,
    done: IconDone,
    started: IconStarted,
    flow: IconFlow
  }

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
.app.work-order {
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
