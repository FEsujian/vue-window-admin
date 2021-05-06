<template>
  <div id="app-window">
    <div
      id="app-window-wrap"
      class="noselect"
      ref="app-window-wrap"
      :class="{draging:window.draging,minimize:window.minimize,maximize: window.maximize,active: isActive}"
      :style="{top:window.top + 'px',left:window.left + 'px',width:window.width+ 'px',height :window.height + 'px','z-index':window.zIndex}"
      @click.prevent="handleWindowClick"
    >
      <div
        class="app-header"
        @dblclick.prevent="appHeaderDbclick(app,$event)"
        @mousedown.prevent="appHeaderMousedown(app,$event)"
        @mouseleave="appHeaderMouseleave"
        @mouseup="appHeaderMouseup"
      >
        <div class="app-header-left">
          <div class="icon-wrap noselect">
            <img
              :src="require(`@/global/assets/ico/${app.icon}.png`)"
              alt
              style="width: auto;height:22px;"
            />
          </div>
        </div>
        <div class="app-header-title">{{app.name}}</div>
        <div class="app-header-right">
          <div class="opera-bar">
            <div
              class="opera-bar-item"
              @click.stop.passive="windowMinimize"
              v-if="window.isMinimize"
            >
              <svg-icon
                data="./assets/svg/min.svg"
                width="14"
                height="14"
                class="opera-bar-item-icon"
              ></svg-icon>
            </div>
            <div
              class="opera-bar-item"
              @click.stop.prevent="windowMaximize"
              v-if="window.isMaximize && !window.maximize"
            >
              <svg-icon
                data="./assets/svg/max.svg"
                width="14"
                height="14"
                class="opera-bar-item-icon"
              ></svg-icon>
            </div>
            <div
              class="opera-bar-item"
              @click.stop.prevent="windowResizable"
              v-if="window.isMaximize && window.maximize"
            >
              <svg-icon
                data="./assets/svg/resizable.svg"
                width="14"
                height="14"
                class="opera-bar-item-icon"
              ></svg-icon>
            </div>
            <div class="opera-bar-item" @click.stop.prevent="closeApp()">
              <svg-icon
                data="./assets/svg/close.svg"
                width="14"
                height="14"
                class="opera-bar-item-icon"
              ></svg-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="app-window-body">
        <iframe :src="IframeAppUrl" frameborder="0" v-if="AppType==='iframe'" class="app-iframe"></iframe>
        <component :is="componentId" v-else></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PlatformModule } from '@/platform/store'
import { Component, Ref, Vue, Watch, Prop } from 'vue-property-decorator'
import AppLoading from '@/platform/components/AppLoading/index.vue'
import AppLoadError from '@/platform/components/AppLoadError/index.vue'

@Component({
  name: 'Window',
  components: {}
})
export default class extends Vue {
  @Prop()
  public app: any

  get AppType () {
    return this.app.type || 'App'
  }

  get IframeAppUrl () {
    return this.app.url || ''
  }

  public componentId = ''

  private window: any = {
    active: false,
    drag: false,
    draging: false,
    isDrag: true,
    isMinimize: true,
    isMaximize: true,
    minimize: false,
    maximize: false,
    isResizable: true,
    resizable: false,
    left: 150,
    top: 150,
    width: 700,
    height: 500,
    zIndex: 5000
  }

  private drag: any = null

  get isActive () {
    return (
      PlatformModule.activeApp &&
      PlatformModule.activeApp.appid === this.app.appid
    )
  }

  appHeaderMousedown (app, e) {
    if (this.window.maximize) return
    this.$bus.$emit('app/window/zIndex', app)
    this.$bus.$emit('app/window/active', app)
    PlatformModule.SET_ACTIVE_APP(app)
    this.window.drag = true
    this.drag = {
      x: e.clientX - this.window.left,
      y: e.clientY - this.window.top
    }
    // 处理窗口拖动
    document.addEventListener('mousemove', (e) => this.appWindowDrop(e))
    document.addEventListener('mouseup', (e) => this.appHeaderMouseup(e))
  }

  appHeaderMouseleave () {
    // if (this.window.drag) this.window.drag = false
  }

  // 窗口移动
  appWindowDrop (e) {
    if (!this.window.drag) return
    this.window.draging = true
    const y = e.clientY - this.drag.y
    const x = e.clientX - this.drag.x
    this.window.top = Math.min(
      Math.max(41, y),
      window.innerHeight - this.window.height
    )
    this.window.left = Math.min(
      Math.max(0, x),
      window.innerWidth - this.window.width
    )
  }

  appHeaderMouseup (e) {
    this.window.drag = false
    this.window.draging = false
    document.removeEventListener('mousemove', this.appWindowDrop)
  }

  appHeaderDrop (app, e) {
    console.log(e, 'e')
  }

  // 窗口最小化操作
  windowMinimize () {
    this.window.minimize = true
  }

  // 窗口最大化操作
  windowMaximize () {
    this.window.maximize = true
    try {
      const ev = document.createEvent('Event')
      ev.initEvent('resize', true, true)
      window.dispatchEvent(ev)
    } catch (e) {}
  }

  // 窗口还原操作
  windowResizable () {
    this.window.maximize = false
    try {
      console.log('窗口还原')
      const ev = document.createEvent('Event')
      ev.initEvent('resize', true, true)
      window.dispatchEvent(ev)
    } catch (e) {}
  }

  // 窗口双击
  appHeaderDbclick () {
    this.window.maximize = !this.window.maximize
    try {
      const ev = document.createEvent('Event')
      ev.initEvent('resize', true, true)
      window.dispatchEvent(ev)
    } catch (e) {}
  }

  // 关闭App
  closeApp () {
    PlatformModule.closeApp(this.app)
  }

  // 窗体点击
  handleWindowClick () {
    this.$bus.$emit('app/window/zIndex', this.app)
    this.$bus.$emit('app/window/active', this.app)
    PlatformModule.SET_ACTIVE_APP(this.app)
  }

  created () {
    if (this.app.window) {
      // 最大化窗口
      if (this.app.window.width === 'max' && this.app.window.height === 'max') {
        this.window.maximize = true
        this.window.width = this.app.window?.minWidth
        this.window.height = this.app.window?.minHeight
      } else {
        this.window.width = this.app.window?.width
        this.window.height = this.app.window?.height
      }

      this.window.left = this.app.window?.stratX
      this.window.top = this.app.window?.startY
    }

    if (this.app.type === 'iframe') {
    } else {
      const AsyncComponent = () => ({
        // 需要加载的组件 (应该是一个 `Promise` 对象)
        component: new Promise((resolve) => {
          setTimeout(() => {
            resolve(import(`@/apps/${this.app.appid}/index.vue`))
          }, 500)
        }),

        // 展示加载时组件的延时时间。默认值是 200 (毫秒)
        delay: 200,
        loading: AppLoading,
        // 如果提供了超时时间且组件加载也超时了，
        // 则使用加载失败时使用的组件。默认值是：`Infinity`
        error: AppLoadError,
        timeout: 3000
      })
      Vue.component(this.app.appid, AsyncComponent)
      this.componentId = this.app.appid
    }
  }

  // 处理已打开窗口的层级
  handleOpenedWindowZIndex () {
    const defaultZIndex = 5000
  }

  mounted () {
    this.$bus.$on('app/window/zIndex', (app) => {
      this.window.zIndex = 5000
    })
    this.$bus.$on('app/window/minimize', (app) => {
      if (this.app.appid === app.appid) {
        this.window.minimize = !this.window.minimize
      }
    })
    this.$bus.$on('app/window/active', (app) => {
      if (app.appid !== this.app.appid) return
      this.window.minimize = false // 设置窗口最小化为false
      this.window.zIndex = 5099
    })
  }
}
</script>

<style lang="less" scoped>
#app-window {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  #app-window-wrap {
    position: absolute;
    z-index: 5000;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.4);

    &.draging {
      opacity: 0.6;
      background-color: #fff;
      z-index: 5999;
      .app-window-body {
        visibility: hidden;
        transition: none !important;
      }
    }
    &.minimize {
      visibility: hidden;
    }
    &.maximize {
      top: 41px !important;
      left: 0 !important;
      width: 100% !important;
      height: calc(~'100vh - 40px') !important;
      .app-header {
        cursor: default;
      }
    }
    .app-header {
      height: 35px;
      background: -moz-linear-gradient(top, #cccccc, #fff); /*火狐*/
      background: -webkit-gradient(
        linear,
        0% 0%,
        0% 100%,
        from(#cccccc),
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
              width: auto;
              height: 16px;
              color: #3a3a3a;
              &:hover {
                color: #409eff;
              }
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
        color: #ccc;
        font-size: 14px;
      }
    }
    &.active {
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
    }
    .app-window-body {
      height: calc(100% - 35px);
      background-color: #fff;
      .app-iframe {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
