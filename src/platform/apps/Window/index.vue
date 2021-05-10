<template>
  <div id="X-window">
    <div
      id="X-window-wrap"
      class="noselect"
      ref="X-window-wrap"
      :class="{draging:window.drag,minimize:window.isMinimize,maximize: window.isMaximize,active: window.isActive}"
      :style="{top:window.top + 'px',left:window.left + 'px',width:window.width+ 'px',height :window.height + 'px','z-index':window.zIndex}"
      @click="handleWindowClick"
    >
      <div class="X-window-header">
        <div
          class="X-window-header-drag"
          @dblclick.prevent="windowHeaderDbclick(window,$event)"
          @mousedown="windowHeaderMousedown($event)"
          @mouseleave="windowHeaderMouseleave"
          @mouseup="windowHeaderMouseup"
        ></div>
        <div class="X-window-header-left">
          <div class="icon-wrap noselect" v-if="window.icon">
            <img
              :src="require(`@/global/assets/ico/${window.icon}.png`)"
              alt
              style="width: auto;height:22px;"
            />
          </div>
        </div>
        <div class="X-window-header-title">{{window.title || window.name}}|{{window.windowId}}</div>
        <div class="X-window-header-right">
          <div class="opera-bar">
            <div
              class="opera-bar-item"
              @click.stop.passive="windowMinimize"
              v-if="window.hasMinimize"
            >
              <svg-icon
                data="./assets/svg/min.svg"
                width="14"
                height="14"
                class="opera-bar-item-icon"
              ></svg-icon>
            </div>
            <!-- 窗口最大化 -->
            <div
              class="opera-bar-item"
              @click.stop.prevent="windowMaximize"
              v-if="window.hasMaximize && !window.isMaximize"
            >
              <svg-icon
                data="./assets/svg/max.svg"
                width="14"
                height="14"
                class="opera-bar-item-icon"
              ></svg-icon>
            </div>
            <!-- 窗口还原 -->
            <div
              class="opera-bar-item"
              @click.stop.prevent="windowResizable"
              v-if="window.hasMaximize && window.isMaximize"
            >
              <svg-icon
                data="./assets/svg/resizable.svg"
                width="14"
                height="14"
                class="opera-bar-item-icon"
              ></svg-icon>
            </div>
            <div class="opera-bar-item" @click.stop.prevent="closeWindow($event)">
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
      <div class="X-window-body">
        <iframe :src="IframeUrl" frameborder="0" v-if="AppType==='iframe'" class="app-iframe"></iframe>
        <component :window="window" :is="componentId" v-else></component>
      </div>
      <div class="X-window-resize resize-top-border"></div>
      <div class="X-window-resize resize-right-border"></div>
      <div class="X-window-resize resize-bottom-border"></div>
      <div class="X-window-resize resize-left-border"></div>
      <div class="X-window-resize resize-top-left"></div>
      <div class="X-window-resize resize-top-right"></div>
      <div class="X-window-resize resize-bottom-left"></div>
      <div class="X-window-resize resize-bottom-right"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { PlatformModule } from '@/platform/store'
import {
  Component,
  Ref,
  Vue,
  Watch,
  Prop,
  ProvideReactive
} from 'vue-property-decorator'
import AppLoading from '@/platform/components/AppLoading/index.vue'
import AppLoadError from '@/platform/components/AppLoadError/index.vue'

@Component({
  name: 'XWindow',
  components: {}
})
export default class extends Vue {
  @Prop()
  public app: any

  @Prop()
  @ProvideReactive()
  public window: any

  get parentWindow () {
    return this.window.parent()
  }

  get AppType () {
    return this.window.type || 'App'
  }

  get IframeUrl () {
    return this.window.url || ''
  }

  mounted () {
    this.initBusEvent()
  }

  // 初始化广播事件
  private initBusEvent () {
    // 更新窗口层级
    this.$bus.$on('window/zIndex/update', (window) => {
      this.window.zIndex = 5000
    })
    // // 窗口激活
    // this.$bus.$on('window/active/update', (window) => {
    //   this.window.minimize = !this.window.minimize
    // })
    // // 窗口最大化
    // this.$bus.$on('window/maximize', (window) => {
    //   //
    // })
    // // 窗口最小化
    // this.$bus.$on('window/minimize', (window) => {
    //   this.window.minimize = !this.window.minimize
    // })
  }

  // 获取窗体信息
  public getWindowInfo () {
    return {}
  }

  public componentId = ''

  windowHeaderMousedown (e) {
    if (this.window.childWindowId || this.window.isMaximize) return
    console.log('窗体头部鼠标按下')
    this.window.active()
    this.window.dragConfig = {
      x: e.clientX - this.window.left,
      y: e.clientY - this.window.top
    }

    // 处理窗口拖动
    document.body.addEventListener('mousemove', this.windowDrop)
    document.body.addEventListener('mouseup', this.windowHeaderMouseup)
  }

  private evList = []

  windowHeaderMouseleave () {
    // if (this.window.drag) this.window.drag = false
  }

  // 窗口移动
  windowDrop (e) {
    if (this.window.isMaximize) return
    console.log('窗口移动')
    this.window.drag = true
    const y = e.clientY - this.window.dragConfig.y
    const x = e.clientX - this.window.dragConfig.x
    this.window.top = Math.min(
      Math.max(41, y),
      window.innerHeight - this.window.height
    )
    this.window.left = Math.min(
      Math.max(0, x),
      window.innerWidth - this.window.width
    )
  }

  windowHeaderMouseup (e) {
    console.log('鼠标弹起')
    this.window.drag = false
    document.body.removeEventListener('mousemove', this.windowDrop)
    document.body.removeEventListener('mouseup', this.windowHeaderMouseup)
    console.log('移除监听器')
  }

  // @Watch('window.drag')
  // private windowDragChange(val) {
  //   if (val === false) {
  //     console.log('移除监听器')
  //     document.body.removeEventListener('mousemove', this.windowDrop)
  //     document.body.removeEventListener('mouseup', this.windowHeaderMouseup)
  //   }
  // }

  windowHeaderDrop (window, e) {
    console.log(e, 'e')
  }

  // 窗口最小化操作
  windowMinimize () {
    this.window.minimize()
  }

  // 窗口最大化操作
  windowMaximize () {
    this.window.maximize()
    try {
      const ev = document.createEvent('Event')
      ev.initEvent('resize', true, true)
      window.dispatchEvent(ev)
    } catch (e) {}
  }

  // 窗口还原操作
  windowResizable () {
    this.window.restore()
    try {
      console.log('窗口还原')
      const ev = document.createEvent('Event')
      ev.initEvent('resize', true, true)
      window.dispatchEvent(ev)
    } catch (e) {}
  }

  // 窗口双击
  windowHeaderDbclick () {
    if (!this.window.hasMaximize) return
    if (this.window.isMaximize) {
      this.window.restore()
    } else {
      this.window.maximize()
    }
    try {
      const ev = document.createEvent('Event')
      ev.initEvent('resize', true, true)
      window.dispatchEvent(ev)
    } catch (e) {}
  }

  // 关闭App
  closeWindow (e) {
    this.window.close()
  }

  // 窗体点击
  handleWindowClick () {
    this.window.active()
  }

  created () {
    // if (this.window.window) {
    //   // 最大化窗口
    //   if (this.window.window.width === 'max' && this.window.window.height === 'max') {
    //     this.window.maximize = true
    //     this.window.width = this.window.window?.minWidth
    //     this.window.height = this.window.window?.minHeight
    //   } else {
    //     this.window.width = this.window.window?.width
    //     this.window.height = this.window.window?.height
    //   }
    //   this.window.left = this.window.window?.stratX
    //   this.window.top = this.window.window?.startY
    // }
    if (this.window.type === 'iframe' || this.window.isChild) {
    } else {
      const AsyncComponent = () => ({
        // 需要加载的组件 (应该是一个 `Promise` 对象)
        component: new Promise((resolve) => {
          setTimeout(() => {
            resolve(import(`@/apps/${this.window.appid}/index.vue`))
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
      Vue.component(this.window.appid, AsyncComponent)
      this.componentId = this.window.appid
    }
  }
}
</script>

<style lang="less" scoped>
#X-window {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  #X-window-wrap {
    position: absolute;
    z-index: 5000;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.4);

    &.draging {
      opacity: 0.6;
      background-color: #fff;
      z-index: 5999;
      .X-window-body {
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
      .X-window-header {
        cursor: default;
      }
    }
    .X-window-header {
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
      .X-window-header-drag {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 5001;
        left: 0;
        top: 0;
      }
      .X-window-header-left {
        margin-left: 12px;
        z-index: 5002;
        .icon-wrap {
          height: 100%;
        }
      }
      .X-window-header-right {
        margin-right: 12px;
        z-index: 5003;
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
      .X-window-header-title {
        position: absolute;
        width: 100%;
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
        z-index: 5000;
      }
    }
    &.active {
      .X-window-header {
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
        .X-window-header-title {
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
    .X-window-body {
      height: calc(100% - 35px);
      background-color: #fff;
      .app-iframe {
        width: 100%;
        height: 100%;
      }
    }

    .X-window-resize {
      width: 10px;
      height: 10px;
      position: absolute;
      // background: transparent;
      z-index: 5090;
      background-color: #409eff;
      &.resize-top-border {
        cursor: ns-resize;
        top: 0;
        width: 100%;
        height: 2px;
      }
      &.resize-right-border {
        cursor: ew-resize;
        top: 0;
        right: 0;
        width: 2px;
        height: 100%;
      }
      &.resize-bottom-border {
        cursor: ns-resize;
        bottom: 0;
        width: 100%;
        height: 2px;
      }
      &.resize-left-border {
        cursor: ew-resize;
        top: 0;
        left: 0;
        width: 2px;
        height: 100%;
      }
      &.resize-top-left {
        cursor: nw-resize;
        top: 0;
        left: 0;
      }
      &.resize-top-right {
        cursor: ne-resize;
        top: 0;
        right: 0;
      }
      &.resize-bottom-left {
        cursor: sw-resize;
        bottom: 0;
        left: 0;
      }
      &.resize-bottom-right {
        cursor: se-resize;
        bottom: 0;
        right: 0;
      }
    }
  }
}
</style>
