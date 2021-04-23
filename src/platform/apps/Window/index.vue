<template>
  <div id="app-window">
    <div
      id="app-wrap"
      class="noselect"
      ref="app-wrap"
      :class="{draging:this.window.draging}"
      :style="{top:window.top + 'px',left:window.left + 'px',width:window.width+ 'px',height :window.height + 'px','z-index':window.zIndex}"
      @click.prevent="handleWindowClick"
    >
      <div
        class="app-header"
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
            <div class="opera-bar-item" @click.stop.passive="handleWindowSize('min')">
              <img :src="require(`@/global/assets/ico/window/min.svg`)" alt class="opera-bar-item-icon" />
            </div>
            <div class="opera-bar-item" @click.stop.prevent="handleWindowSize('max')">
              <img :src="require(`@/global/assets/ico/window/max.svg`)" alt class="opera-bar-item-icon" />
            </div>
            <div class="opera-bar-item" @click.stop.prevent="closeApp()">
              <img :src="require(`@/global/assets/ico/window/close.svg`)" alt class="opera-bar-item-icon" />
            </div>
          </div>
        </div>
      </div>
      <div class="app-body">
        <component :is="componentId"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PlatformModule } from '@/platform/store'
import { Component, Ref, Vue, Watch, Prop } from 'vue-property-decorator'
@Component({
  name: 'Window',
  components: {}
})
export default class extends Vue {
  @Prop()
  public app: any

  public componentId = ''
  private window: any = {
    active: false,
    drag: false,
    draging: false,
    left: 150,
    top: 150,
    width: 700,
    height: 500,
    zIndex: 5000
  }

  private drag: any = null
  appHeaderMousedown (app, e) {
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

  handleWindowSize (type?: any) {
    //
  }

  // 关闭App
  closeApp () {
    PlatformModule.closeApp(this.app)
  }

  // 窗体点击
  handleWindowClick () {
    this.$bus.$emit('app/window/zindex', this.app)
  }

  created () {
    if (this.app.window) {
      this.window.width = this.app.window?.width
      this.window.height = this.app.window?.height
      this.window.left = this.app.window?.stratX
      this.window.top = this.app.window?.startY
    }

    const AsyncComponent = () => ({
      // 需要加载的组件 (应该是一个 `Promise` 对象)
      component: import(`@/apps/${this.app.appid}/index.vue`),
      // 展示加载时组件的延时时间。默认值是 200 (毫秒)
      delay: 200,
      // 如果提供了超时时间且组件加载也超时了，
      // 则使用加载失败时使用的组件。默认值是：`Infinity`
      timeout: 3000
    })
    Vue.component(this.app.appid, AsyncComponent)
    this.componentId = this.app.appid

    this.$bus.$on('app/window/zindex', (app) => {
      if (app.appid === this.app.appid) {
        this.window.zIndex = 5099
      } else {
        this.window.zIndex = 5000
      }
    })
  }

  mounted () {
    this.$bus.$emit('app/window/zindex', this.app)
  }
}
</script>

<style lang="less" scoped>
#app-window {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  #app-wrap {
    position: absolute;
    z-index: 5000;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.4);
    &.draging {
      opacity: 0.6;
      background-color: #fff;
      z-index: 5999;
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
      height: calc(100% - 35px);
      background-color: #fff;
    }
  }
}
</style>
