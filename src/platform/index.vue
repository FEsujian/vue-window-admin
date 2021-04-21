<template>
  <div id="platform" ref="platform" @contextmenu.prevent>
    <Taskbar />
    <MainMenu />
    <Desktop />
    <Window />
  </div>
</template>

<script>
import Desktop from './apps/Desktop/index.vue'
import MainMenu from './apps/MainMenu/index.vue'
import Taskbar from './apps/Taskbar/index.vue'
import Window from './apps/Window/index.vue'
export default {
  components: {
    Desktop,
    MainMenu,
    Taskbar,
    Window
  },
  data: () => {
    return {
      left: 0,
      top: 0,
      desktopRightMenuItem: null,
      mainRightMenuItem: null,
      visible: {
        mainRightMenu: false,
        desktopRightMenu: false
      },
      drag: {
        x: 0, y: 0
      },
      app: {
        drag: false,
        left: 100,
        top: 100
      },
      desktopMenuItemMove: false,
      button: false,
      selection: { startSelection: false, start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      layout: [
        { x: 0, y: 4, w: 1, h: 2, i: '4', name: '监控中心', icon: 'Monitor' },
        { x: 0, y: 6, w: 1, h: 2, i: '7', name: '资源管理', icon: 'Resource' },
        { x: 0, y: 2, w: 1, h: 2, i: '10', name: '控制面板', icon: 'ControlPanel' },
        { x: 0, y: 5, w: 1, h: 2, i: '13', name: '作业中心', icon: 'Work' }
      ],
      mainMenu: [
        { x: 0, y: 0, w: 1, h: 2, i: '0', name: '系统设置', icon: 'Setting' },
        { x: 1, y: 0, w: 1, h: 2, i: '1', name: '命令行', icon: 'Powershell' },
        { x: 2, y: 0, w: 1, h: 2, i: '2', name: '组织与用户', icon: 'People' },
        { x: 3, y: 0, w: 1, h: 2, i: '3', name: '搜索', icon: 'Search' },
        { x: 4, y: 0, w: 1, h: 2, i: '4', name: '监控中心', icon: 'Monitor' },
        { x: 5, y: 0, w: 1, h: 2, i: '5', name: '浏览器', icon: 'Browser' },
        { x: 6, y: 0, w: 1, h: 2, i: '7', name: '资源管理', icon: 'Resource' },
        { x: 7, y: 0, w: 1, h: 2, i: '8', name: '日志中心', icon: 'Logs' },
        { x: 0, y: 1, w: 1, h: 2, i: '9', name: '帮助中心', icon: 'Help' },
        { x: 1, y: 1, w: 1, h: 2, i: '10', name: '控制面板', icon: 'ControlPanel' },
        { x: 2, y: 1, w: 1, h: 2, i: '11', name: '回收站', icon: 'Trash' },
        { x: 3, y: 1, w: 1, h: 2, i: '12', name: '用户中心', icon: 'Users' },
        { x: 4, y: 1, w: 1, h: 2, i: '13', name: '作业中心', icon: 'Work' },
        { x: 5, y: 1, w: 1, h: 2, i: '14', name: '工单中心', icon: 'WorkOrder' },
        { x: 6, y: 1, w: 1, h: 2, i: '15', name: '消息中心', icon: 'Message' },
        { x: 7, y: 1, w: 1, h: 2, i: '16', name: '云账号接入', icon: 'CloudAccount' },
        { x: 0, y: 2, w: 1, h: 2, i: '17', name: '物理设备管理', icon: 'Physical' }
      ]
    }
  },
  watch: {

  },
  methods: {
    openDesktopRightMenu (e, item) {
      this.desktopRightMenuItem = item
      this.top = e.clientY
      this.left = e.clientX
      this.visible.desktopRightMenu = true
    },
    closeDesktopRightMenu () {
      this.visible.desktopRightMenu = false
    },
    handleDesktopMenuItemMove () {
      this.desktopMenuItemMove = true
    },
    getSelectionStyle () {
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

  }

}
</script>

<style lang="less">
#platform {
  overflow: hidden;

  .icon-wrap {
    width: auto;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }
  .pointer {
    cursor: pointer !important;
  }
  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently not supported by any browser */
  }
}
</style>
