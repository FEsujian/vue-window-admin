<template>
  <div id="app-window">
    <div
      class="app noselect"
      ref="app"
      :class="{draging:this.app.draging}"
      :style="{top:app.top + 'px',left:app.left + 'px'}"
    >
      <div
        class="app-header"
        @mousedown.prevent="appHeaderMousedown(app,$event)"
        @mouseleave="appHeaderMouseleave"
        @mouseup="appHeaderMouseup"
      >
        <div class="app-header-left">
          <div class="icon-wrap noselect">
            <img :src="require(`@/assets/ico/Monitor.png`)" alt style="width: auto;height:22px;" />
          </div>
        </div>
        <div class="app-header-title">监控中心</div>
        <div class="app-header-right">
          <div class="opera-bar">
            <div class="opera-bar-item" @click.stop.passive="handleWindowSize('min')">
              <img :src="require(`@/assets/ico/window/min.svg`)" alt class="opera-bar-item-icon" />
            </div>
            <div class="opera-bar-item" @click.stop.prevent="handleWindowSize('max')">
              <img :src="require(`@/assets/ico/window/max.svg`)" alt class="opera-bar-item-icon" />
            </div>
            <div class="opera-bar-item" @click.stop.prevent="handleCloseWindow()">
              <img :src="require(`@/assets/ico/window/close.svg`)" alt class="opera-bar-item-icon" />
            </div>
          </div>
        </div>
      </div>
      <div class="app-body">
        <div class="app-body-wrap">
          <div class="menu">
            <ul class="menu-list">
              <li
                class="menu-item"
                :class="{active: active.menu === 'dashboard'}"
                @click="checkMenu('dashboard')"
              >监控概览</li>
              <li
                class="menu-item"
                :class="{active: active.menu === 'server'}"
                @click="checkMenu('server')"
              >服务器监控</li>
              <li
                class="menu-item"
                :class="{active: active.menu === 'website'}"
                @click="checkMenu('website')"
              >网站监控</li>
              <li
                class="menu-item"
                :class="{active: active.menu === 'analysis'}"
                @click="checkMenu('analysis')"
              >监控分析</li>
              <li
                class="menu-item"
                :class="{active: active.menu === 'manage'}"
                @click="checkMenu('manage')"
              >告警管理</li>
              <li
                class="menu-item"
                :class="{active: active.menu === 'setting'}"
                @click="checkMenu('setting')"
              >监控设置</li>
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
@Component({
  name: 'Window',
  components: {}
})
export default class extends Vue {
  private app = {
    drag: false,
    draging: false,
    left: 100,
    top: 100
  }

  private active = {
    menu: 'dashboard',
    tab: 'group'
  }

  private drag: any = null
  appHeaderMousedown (app, e) {
    this.app.drag = true
    this.drag = { x: e.clientX - this.app.left, y: e.clientY - this.app.top }
    // 处理窗口拖动
    document.addEventListener('mousemove', (e) => this.appWindowDrop(e))
    document.addEventListener('mouseup', (e) => this.appHeaderMouseup(e))
  }

  appHeaderMouseleave () {
    // if (this.app.drag) this.app.drag = false
  }

  // 窗口移动
  appWindowDrop (e) {
    if (!this.app.drag) return
    this.app.draging = true
    const y = e.clientY - this.drag.y
    const x = e.clientX - this.drag.x
    this.app.top = Math.min(Math.max(41, y), window.innerHeight - 500)
    this.app.left = Math.min(Math.max(0, x), window.innerWidth - 800)
  }

  appHeaderMouseup (e) {
    this.app.drag = false
    this.app.draging = false
    document.removeEventListener('mousemove', this.appWindowDrop)
  }

  appHeaderDrop (app, e) {
    console.log(e, 'e')
  }

  handleWindowSize (type?: any) {
    //
  }

  handleCloseWindow () {
    console.log('关闭窗口')
    this.$bus.$emit('platform/window/trigger', { app: 'sujian' })
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
#app-window {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  .app {
    width: 800px;
    height: 500px;
    position: absolute;
    z-index: 5000;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.4);
    &.draging {
      opacity: 0.6;
      background-color: #fff;
      .app-body {
        visibility: hidden;
      }
    }
    .app-header {
      height: 35px;
      background: -moz-linear-gradient(top, #9fc7ff, #fff); /*火狐*/
      background: -webkit-gradient(
        linear,
        0% 0%,
        0% 100%,
        from(#9fc7ff),
        to(#fff)
      ); /*谷歌*/
      cursor: move;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .app-header-left {
        margin-left: 12px;
        .icon-wrap {
          height: 100%;
        }
      }
      .app-header-right {
        margin-right: 12px;
        .opera-bar {
          display: flex;
          align-items: center;
          .opera-bar-item {
            margin: 0 8px;
            cursor: pointer;
            .opera-bar-item-icon {
              color: #fff;
              width: auto;
              height: 16px;
            }
          }
        }
      }
      .app-header-title {
        position: absolute;
        width: 50%;
        height: 35px;
        line-height: 35px;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        text-align: center;
        color: #409eff;
        font-size: 14px;
      }
    }
    .app-body {
      height: calc(500px - 35px);
      background-color: #fff;
    }

    .app-body-wrap {
      display: flex;
      height: 100%;
      overflow: hidden;
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
}
</style>
