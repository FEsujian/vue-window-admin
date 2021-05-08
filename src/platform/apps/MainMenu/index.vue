<template>
  <div id="main-menu" :class="{'main-menu-show':mainMenuOpenStatus}">
    <div class="main-menu-shadow" @click.prevent="handleAppContainerShadowClick"></div>
    <grid-layout
      :col-num="7"
      :layout.sync="mainMenu"
      :row-height="46"
      :is-draggable="true"
      :is-resizable="false"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[20, 20]"
      :use-css-transforms="true"
      class="main-menu-wrap"
    >
      <grid-item
        v-for="item in mainMenu"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        class="pointer noselect"
        @moved="appIconMoved"
        @click.native="openApp(item)"
        @contextmenu.prevent.native="openMainRightMenu($event,item)"
      >
        <div class="icon-wrap">
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
      v-show="visible.mainRightMenu"
      class="main-right-menu"
      :style="{left:left + 'px', top: top + 'px'}"
    >
      <div class="main-right-menu-item" @click="addDesktop(mainRightMenuItem)">
        <span>添加到桌面</span>
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
  name: 'MainMenu',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  }
})
export default class extends Vue {
  @Watch('visible.mainRightMenu')
  private mainRightMenuChange (val) {
    if (val) {
      document.body.addEventListener('click', this.closeMainRightMenu)
    } else {
      document.body.removeEventListener('click', this.closeMainRightMenu)
    }
  }

  private mainMenu = app.mainMenu

  get mainMenuOpenStatus () {
    return PlatformModule.opened.mainMenu
  }

  private left = 0
  private top = 0
  private mainRightMenuItem: any = null
  private visible: any = {
    mainRightMenu: false,
    mainRightMenuItem: false
  }

  private openMainRightMenu (e: any, item: any) {
    this.mainRightMenuItem = item
    this.top = e.clientY
    this.left = e.clientX
    this.visible.mainRightMenu = true
  }

  private handleAppContainerShadowClick () {
    console.log('shadow click', this.visible.mainRightMenu)
    if (this.visible.mainRightMenu) {
      this.closeMainRightMenu()
    } else {
      PlatformModule.CLOSE_MAIN_MENU(false)
    }
  }

  private closeMainRightMenu () {
    this.visible.mainRightMenu = false
    console.log(this.visible.mainRightMenu, '关闭主菜单右键')
  }

  private addDesktop (item: any) {
    console.log(item, 'item')
  }

  private iconMove = false
  private appIconMoved () {
    this.iconMove = true
    setTimeout(() => {
      this.iconMove = false
    }, 500)
  }

  // 打开App
  private openApp (item) {
    if (this.iconMove) return
    PlatformModule.CLOSE_MAIN_MENU(false)
    // PlatformModule.openApp(item)
  }
}
</script>

<style lang="less" scoped>
#main-menu {
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  height: calc(100% - 40px);
  visibility: hidden;
  z-index: 9000;
  .icon-wrap {
    width: auto;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }
  &.main-menu-show {
    visibility: visible;
    opacity: 1;
  }
  .main-menu-shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9001;
  }
  .main-menu-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 70%;
    height: auto;
    z-index: 9002;
  }
  .main-right-menu {
    margin: 0;
    position: fixed;
    background-color: #fff;
    z-index: 9099;
    padding: 5px 0px;
    border-radius: 2px;
  }

  .main-right-menu-item {
    font-size: 12px;
    cursor: pointer;
    padding: 6px 20px;
    &:hover {
      background-color: #67b2fd;
      color: #fff;
    }
  }
}
</style>
