<template>
  <div
    id="desktop"
    ref="desktop"
    class="noselect"
    @click.stop.prevent="handleLeftClick($event)"
    @contextmenu.stop.prevent="handleRightClick($event)"
  >
    <grid-layout
      :col-num="16"
      :cols="{lg: 16, md: 16, sm: 6, xs: 4, xxs: 2 }"
      :layout.sync="desktop"
      :row-height="46"
      :is-draggable="true"
      :is-resizable="false"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in desktop"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        class="pointer"
        @click.prevent.native="handleDesktopMenuItemClick(item)"
        @dblclick.prevent.native="openApp(item)"
        @contextmenu.stop.prevent.native="openDesktopRightMenu($event,item)"
        @mouseenter.prevent.native="desktopMenuItemMove = true"
        @mouseleave.prevent.native="desktopMenuItemMove = false"
      >
        <div class="icon-wrap" v-tip.dark.right="item.name">
          <img
            :src="require(`@/global/assets/ico/${item.icon}.png`)"
            alt
            style="width: auto;height:64px;"
          />
        </div>

        <div style="text-align:center;margin-top:5px;font-size:12px;color:#fff;">{{item.name}}</div>
      </grid-item>
    </grid-layout>
    <div
      class="mouse-action-section"
      v-show="selection.startSelection"
      :style="getSelectionStyle()"
    ></div>
    <div
      class="desktop-right-menu"
      :style="{left:left + 'px', top: top + 'px'}"
      v-show="visible.desktopRightMenu"
    >
      <div class="desktop-right-menu-item" @click="deleteDesktopIcon(desktopRightMenuItem)">
        <span>打开</span>
      </div>
      <div class="desktop-right-menu-item" @click="deleteDesktopIcon(desktopRightMenuItem)">
        <span>删除快捷方式</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import VueGridLayout from 'vue-grid-layout'
import { PlatformModule } from '@/platform/store'
import app from '@/apps/app'
@Component({
  name: 'Desktop',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  }
})
export default class extends Vue {
  @Ref('desktop')
  private desktopRef: any

  @Watch('visible.desktopRightMenu')
  private destopRightMenuChange (val: any) {
    if (val) {
      document.body.addEventListener('click', this.closeDesktopRightMenu)
    } else {
      document.body.removeEventListener('click', this.closeDesktopRightMenu)
    }
  }

  private closeDesktopRightMenu () {
    this.visible.desktopRightMenu = false
  }

  private desktop: any = app.desktop

  private selection: any = {
    startSelection: false,
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 }
  }

  private desktopMenuItemMove = false

  private desktopRightMenuItem = null
  private left = 0
  private top = 0
  private visible = {
    desktopRightMenu: false
  }

  private getSelectionStyle () {
    var a = this.selection.start
    var b = this.selection.end
    var topLeft = {
      x: Math.min(a.x, b.x),
      y: Math.min(a.y, b.y)
    }
    var bottomRight = {
      x: Math.max(a.x, b.x),
      y: Math.max(a.y, b.y)
    }
    this.selection.topLeft = topLeft
    this.selection.bottomRight = bottomRight
    return {
      top: topLeft.y + 'px',
      left: topLeft.x + 'px',
      height: bottomRight.y - topLeft.y + 'px',
      width: bottomRight.x - topLeft.x + 'px'
    }
  }

  private openDesktopRightMenu (e: any, item: any) {
    this.desktopRightMenuItem = item
    this.top = e.clientY
    this.left = e.clientX
    this.visible.desktopRightMenu = true
  }

  private deleteDesktopIcon (item: any) {
    console.log(item, 'item')
  }

  private handleDesktopMenuItemMove () {
    this.desktopMenuItemMove = true
  }

  // 桌面左键点击事件
  private handleLeftClick () {
    console.log('桌面左键点击')
    this.visible.desktopRightMenu = false
  }

  // 桌面右键点击事件
  private handleRightClick () {
    console.log('桌面右键点击')
    this.visible.desktopRightMenu = false
  }

  // 桌面图标单击
  handleDesktopMenuItemClick (item) {
    console.log('桌面图标单击', item)
  }

  // 打开App
  private openApp (item) {
    console.log('打开APP')
    PlatformModule.openApp(item)
  }

  created () {
    this.$bus.$on('platform/window/trigger', (data) => {
      console.log(data, 'data')
    })
  }

  mounted () {
    this.$nextTick(() => {
      this.desktopRef.addEventListener('mousedown', (data: any) => {
        if (this.desktopMenuItemMove) return
        this.selection.startSelection = true
        this.selection.start = { x: data.x, y: data.y - 40 }
        this.selection.end = { x: data.x, y: data.y - 40 }
      })
      this.desktopRef.addEventListener('mouseup', (e: any) => {
        this.selection.startSelection = false
      })
      document.body.addEventListener(
        'mousemove',
        (e) => {
          // e.preventDefault()
          if (this.selection.startSelection) {
            const maxX = this.desktopRef.clientWidth
            const maxY = this.desktopRef.clientHeight
            let x = e.clientX
            let y = e.clientY - 40
            x = Math.min(maxX, x)
            y = Math.min(maxY, y)
            this.selection.end = { x: x, y: y }
          }
        },
        true
      )
      document.body.addEventListener(
        'mouseup',
        (e) => {
          this.selection.startSelection = false
        },
        true
      )
      document.body.removeEventListener(
        'mousemove',
        () => {
          console.log('移出mousemove事件')
        },
        true
      )
    })
  }
}
</script>

<style lang="less" scoped>
#desktop {
  pointer-events: stroke;
  width: 100%;
  height: 600px;
  background: -moz-linear-gradient(top, #005ddf, #1f7cff); /*火狐*/
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(#005ddf),
    to(#1f7cff)
  ); /*谷歌*/

  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-start(0, #005ddf),
    color-stop(1, #1f7cff)
  ); /* Safari & Chrome*/
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#005ddf', endColorstr='#1f7cff'); /*IE6 & IE7*/
  -ms-filter: "progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#005ddf', endColorstr='#1f7cff')"; /* IE8 */

  overflow: hidden;
  position: absolute;
  width: 100%;
  height: calc(100% - 40px);
  border: 0 none;
  overflow: hidden;
  cursor: default;
  zoom: 1;
  top: 40px;

  .desktop-right-menu {
    margin: 0;
    position: fixed;
    background-color: #fff;
    z-index: 9099;
    padding: 5px 0px;
    border-radius: 2px;
  }

  .desktop-right-menu-item {
    font-size: 12px;
    cursor: pointer;
    padding: 6px 20px;
    &:hover {
      background-color: #67b2fd;
      color: #fff;
    }
  }

  .mouse-action-section {
    position: absolute;
    border: 1px solid rgba(103, 178, 253, 0.6);
    background: rgba(103, 178, 253, 0.2);
  }

  .icon-wrap {
    width: auto;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }
}
</style>
