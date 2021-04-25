<template>
  <div class="app monitor">
    <div class="app-body">
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
            <span class="title">服务器监控</span>
          </li>
          <li
            class="menu-item"
            :class="{active: active.menu === 'website'}"
            @click="checkMenu('website')"
          >
            <svg-icon :data="icons.website" width="22" height="22"></svg-icon>
            <span class="title">网站监控</span>
          </li>
          <li
            class="menu-item"
            :class="{active: active.menu === 'analysis'}"
            @click="checkMenu('analysis')"
          >
            <svg-icon :data="icons.analysis" width="22" height="22"></svg-icon>
            <span class="title">监控分析</span>
          </li>
          <li
            class="menu-item"
            :class="{active: active.menu === 'manage'}"
            @click="checkMenu('manage')"
          >
            <svg-icon :data="icons.manage" width="22" height="22"></svg-icon>
            <span class="title">告警管理</span>
          </li>
          <li
            class="menu-item"
            :class="{active: active.menu === 'setting'}"
            @click="checkMenu('setting')"
          >
            <svg-icon :data="icons.setting" width="22" height="22"></svg-icon>
            <span class="title">监控设置</span>
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
import IconServer from './assets/svg/server.svg'
import IconWebsite from './assets/svg/website.svg'
import IconAnalysis from './assets/svg/analysis.svg'
import IconManage from './assets/svg/manage.svg'
import IconSetting from './assets/svg/setting.svg'
@Component({
  name: 'AppMointor',
  components: {}
})
export default class extends Vue {
  private active = {
    menu: 'dashboard',
    tab: 'group'
  }

  private icons = {
    server: IconServer,
    website: IconWebsite,
    analysis: IconAnalysis,
    manage: IconManage,
    setting: IconSetting
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
.app.monitor {
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
