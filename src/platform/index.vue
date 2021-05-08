<template>
  <div id="platform" ref="platform" @contextmenu.prevent>
    <Taskbar />
    <MainMenu />
    <Desktop />
    <Application />
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch, Prop } from 'vue-property-decorator'
import Desktop from './apps/Desktop/index.vue'
import MainMenu from './apps/MainMenu/index.vue'
import Taskbar from './apps/Taskbar/index.vue'
import Application from './apps/Application/index.vue'
@Component({
  name: 'Platform',
  components: {
    Desktop,
    MainMenu,
    Taskbar,
    Application
  }
})
export default class extends Vue {
  public selection: any = {
    startSelection: false,
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 }
  }

  public left = 0
  public top = 0
  public desktopRightMenuItem = 0
  public mainRightMenuItem = 0
  public desktopMenuItemMove = false
  public visible = {
    mainRightMenu: false,
    desktopRightMenu: false
  }

  public drag = {
    x: 0,
    y: 0
  }

  public app = {
    drag: false,
    left: 100,
    top: 100
  }

  openDesktopRightMenu (e, item) {
    this.desktopRightMenuItem = item
    this.top = e.clientY
    this.left = e.clientX
    this.visible.desktopRightMenu = true
  }

  closeDesktopRightMenu () {
    this.visible.desktopRightMenu = false
  }

  handleDesktopMenuItemMove () {
    this.desktopMenuItemMove = true
  }

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
</script>

<style lang="less">
#platform {
  overflow: hidden;

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
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul {
  list-style-type: none;
}
</style>
