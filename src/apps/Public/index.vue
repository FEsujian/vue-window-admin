<template>
  <div class="app public">
    <div class="app-body">
      <div class="menu">
        <ul class="menu-list">
          <li
            class="menu-item"
            :class="{active: active.menu === 'command'}"
            @click="checkMenu('command')"
          >概览</li>
          <li
            class="menu-item"
            :class="{active: active.menu === 'script'}"
            @click="checkMenu('script')"
          >主机管理</li>
          <li
            class="menu-item"
            :class="{active: active.menu === 'job'}"
            @click="checkMenu('job')"
          >成本优化</li>
          <li
            class="menu-item"
            :class="{active: active.menu === 'record'}"
            @click="checkMenu('record')"
          >配置</li>
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
@Component({
  name: 'AppPublic',
  components: {}
})
export default class extends Vue {
  private active = {
    menu: 'command',
    tab: 'group'
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
.app.public {
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
