<template>
  <App id="message">
    <div class="menu">
      <ul class="menu-list">
        <li
          class="menu-item"
          :class="{active: active.menu === 'message'}"
          @click="checkMenu('message')"
        >
          <svg-icon :data="icons.message" width="22" height="22"></svg-icon>
          <span class="title">站内信</span>
        </li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'subscribe'}"
          @click="checkMenu('subscribe')"
        >
          <svg-icon :data="icons.subscribe" width="22" height="22"></svg-icon>
          <span class="title">消息订阅</span>
        </li>
        <li class="menu-item" :class="{active: active.menu === 'user'}" @click="checkMenu('user')">
          <svg-icon :data="icons.user" width="22" height="22"></svg-icon>
          <span class="title">接收人管理</span>
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
  </App>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import IconMessage from './assets/svg/message.svg'
import IconSubscribe from './assets/svg/subscribe.svg'
import IconUser from './assets/svg/user.svg'
@Component({
  name: 'AppMessage',
  components: {}
})
export default class extends Vue {
  private active = {
    menu: 'message',
    tab: 'group'
  }

  private icons = {
    message: IconMessage,
    subscribe: IconSubscribe,
    user: IconUser
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
#message {
  height: 100%;
  overflow: hidden;
  .app-body {
    display: flex;
    height: 100%;
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
