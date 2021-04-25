<template>
  <div class="app security">
    <div class="app-body">
      <div class="menu">
        <ul class="menu-list">
          <li
            class="menu-item"
            :class="{active: active.menu === 'host'}"
            @click="checkMenu('host')"
          >
            <svg-icon :data="icons.host" width="22" height="22"></svg-icon>
            <span class="title">主机安全体检</span>
          </li>
          <li
            class="menu-item"
            :class="{active: active.menu === 'grade'}"
            @click="checkMenu('grade')"
          >
            <svg-icon :data="icons.grade" width="22" height="22"></svg-icon>
            <span class="title">等保评测</span>
          </li>
          <li
            class="menu-item"
            :class="{active: active.menu === 'intelligent'}"
            @click="checkMenu('intelligent')"
          >
            <svg-icon :data="icons.intelligent" width="22" height="22"></svg-icon>
            <span class="title">智能诊断器</span>
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
import IconHost from './assets/svg/host.svg'
import IconGrade from './assets/svg/grade.svg'
import IconIntelligent from './assets/svg/intelligent.svg'
@Component({
  name: 'AppMointor',
  components: {}
})
export default class extends Vue {
  private active = {
    menu: 'host',
    tab: 'group'
  }

  private icons = {
    host: IconHost,
    grade: IconGrade,
    intelligent: IconIntelligent
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
.app.security {
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
