<template>
  <div class="app work">
    <div class="app-body">
      <div class="menu">
        <ul class="menu-list">
          <li
            class="menu-item"
            :class="{active: active.menu === 'command'}"
            @click="checkMenu('command')"
          >
            <svg-icon :data="icons.command" width="22" height="22"></svg-icon>
            <span class="title">命令执行</span>
          </li>
          <li
            class="menu-item"
            :class="{active: active.menu === 'script'}"
            @click="checkMenu('script')"
          >
            <svg-icon :data="icons.script" width="22" height="22"></svg-icon>
            <span class="title">脚本执行</span>
          </li>
          <li class="menu-item" :class="{active: active.menu === 'job'}" @click="checkMenu('job')">
            <svg-icon :data="icons.job" width="22" height="22"></svg-icon>
            <span class="title">作业列表</span>
          </li>
          <li
            class="menu-item"
            :class="{active: active.menu === 'record'}"
            @click="checkMenu('record')"
          >
            <svg-icon :data="icons.record" width="22" height="22"></svg-icon>
            <span class="title">执行记录</span>
          </li>
          <li
            class="menu-item"
            :class="{active: active.menu === 'manage'}"
            @click="checkMenu('manage')"
          >
            <svg-icon :data="icons.manage" width="22" height="22"></svg-icon>
            <span class="title">脚本管理</span>
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
import IconCommond from './assets/icons/command.svg'
import IconScript from './assets/icons/script.svg'
import IconJob from './assets/icons/job.svg'
import IconRecord from './assets/icons/record.svg'
import IconManage from './assets/icons/manage.svg'

@Component({
  name: 'AppWork',
  components: {}
})
export default class extends Vue {
  private icons = {
    command: IconCommond,
    script: IconScript,
    job: IconJob,
    record: IconRecord,
    manage: IconManage
  }

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
.app.work {
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
