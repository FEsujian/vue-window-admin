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
        @click.native="handleMainMenuItemClick(item)"
        @contextmenu.prevent.native="openMainRightMenu($event,item)"
      >
        <div class="icon-wrap">
          <img :src="require(`@/assets/ico/${item.icon}.png`)" alt style="width: auto;height:64px;" />
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

  private mainMenu = [
    { x: 0, y: 0, w: 1, h: 2, i: '0', name: '系统设置', icon: 'Setting' },
    { x: 1, y: 0, w: 1, h: 2, i: '1', name: '命令行', icon: 'Powershell' },
    { x: 2, y: 0, w: 1, h: 2, i: '2', name: '组织与用户', icon: 'People' },
    { x: 3, y: 0, w: 1, h: 2, i: '3', name: '搜索', icon: 'Search' },
    { x: 4, y: 0, w: 1, h: 2, i: '4', name: '监控中心', icon: 'Monitor' },
    { x: 5, y: 0, w: 1, h: 2, i: '5', name: '浏览器', icon: 'Browser' },
    { x: 6, y: 0, w: 1, h: 2, i: '7', name: '资源管理', icon: 'Resource' },
    { x: 0, y: 1, w: 1, h: 2, i: '9', name: '帮助中心', icon: 'Help' },
    { x: 1, y: 1, w: 1, h: 2, i: '10', name: '控制面板', icon: 'ControlPanel' },
    { x: 2, y: 1, w: 1, h: 2, i: '11', name: '回收站', icon: 'Trash' },
    { x: 3, y: 1, w: 1, h: 2, i: '12', name: '用户中心', icon: 'Users' },
    { x: 4, y: 1, w: 1, h: 2, i: '13', name: '作业中心', icon: 'Work' },
    { x: 5, y: 1, w: 1, h: 2, i: '14', name: '工单中心', icon: 'WorkOrder' },
    { x: 6, y: 1, w: 1, h: 2, i: '15', name: '消息中心', icon: 'Message' },
    { x: 0, y: 2, w: 1, h: 2, i: '8', name: '日志中心', icon: 'Logs' },
    {
      x: 1,
      y: 2,
      w: 1,
      h: 2,
      i: '16',
      name: '云账号接入',
      icon: 'CloudAccount'
    },
    { x: 2, y: 2, w: 1, h: 2, i: '17', name: '物理设备管理', icon: 'Physical' }
  ]

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

  private handleMainMenuItemClick (item: any) {
    console.log(1111)
  }

  private addDesktop (item: any) {
    console.log(item, 'item')
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
    padding: 2px 20px;
    &:hover {
      background-color: #67b2fd;
      color: #fff;
    }
  }
}
</style>
