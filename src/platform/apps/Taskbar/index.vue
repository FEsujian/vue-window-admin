<template>
  <div id="taskbar" class="noselect">
    <div id="taskbar-left">
      <div class="main-menu">
        <button
          class="main-menu-button pointer"
          :class="{'btn-pressed':mainMenuOpenStatus}"
          @click="menuClick"
        >
          <img :src="require(`@/global/assets/ico/MainMenu.svg`)" alt class="main-menu-icon" />
        </button>
      </div>
      <div class="task-list">
        <div
          class="task-item"
          :class="{'btn-pressed':activeApp && activeApp.appid === app.appid}"
          v-for="app in opendAppList"
          :key="app.appid"
          @click="handleTaskItemClick(app)"
        >
          <div class="icon-wrap">
            <img
              :src="require(`@/global/assets/ico/${app.icon}.png`)"
              alt
              style="width: auto;height:32px;"
            />
          </div>
        </div>
      </div>
    </div>
    <div id="taskbar-right">
      <div class="right-item" title="全局搜索">
        <div class="icon-wrap">
          <img :src="require(`@/global/assets/ico/Search.png`)" alt />
        </div>
      </div>
      <div class="right-item" title="消息中心">
        <div class="icon-wrap">
          <img :src="require(`@/global/assets/ico/Message.png`)" alt />
        </div>
      </div>
      <div class="right-item" title="任务中心">
        <div class="icon-wrap">
          <img :src="require(`@/global/assets/ico/Task.png`)" alt />
        </div>
      </div>
      <div class="right-item" title="用户中心">
        <div class="icon-wrap">
          <img :src="require(`@/global/assets/ico/User.png`)" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import { PlatformModule } from '@/platform/store'
@Component({
  name: 'TaskBar',
  components: {}
})
export default class extends Vue {
  get mainMenuOpenStatus () {
    return PlatformModule.opened.mainMenu
  }

  get activeApp () {
    return PlatformModule.activeApp
  }

  get opendAppList () {
    return PlatformModule.openAppList
  }

  private menuClick () {
    PlatformModule.TOGGLE_MAIN_MENU()
  }

  private handleTaskItemClick (app) {
    if (
      !PlatformModule.activeApp ||
      PlatformModule.activeApp.appid !== app.appid
    ) {
      PlatformModule.SET_ACTIVE_APP(app)
      this.handleActiveApp(app)
    } else {
      console.log('处理最小化')
      this.$bus.$emit('app/window/minimize', app)

      // TODO
      // 计算当前激活窗口
      PlatformModule.SET_ACTIVE_APP(null)
    }
  }

  private handleActiveApp (app) {
    this.$bus.$emit('app/window/zIndex', app)
    this.$bus.$emit('app/window/active', app)
  }
}
</script>

<style lang="less" scoped>
#taskbar {
  z-index: 5;
  position: absolute;
  top: 0px;
  width: 100%;
  height: 40px;
  text-decoration: none;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(105%, #bddbfa),
    color-stop(0%, #80b5ea)
  );
  background: -moz-linear-gradient(center top, #bddbfa 105%, #80b5ea 0%);
  background: -ms-linear-gradient(top, #bddbfa 105%, #80b5ea 0%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#bddbfa', endColorstr='#80b5ea');
  background-color: #bddbfa;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-shadow: 1px 1px 0px #528ecc;
  -webkit-box-shadow: inset 1px 1px 0px 0px #dcecfb;
  -moz-box-shadow: inset 1px 1px 0px 0px #dcecfb;
  box-shadow: inset 1px 1px 0px 0px #dcecfb;

  .main-menu {
    .main-menu-button {
      background-color: inherit;
      width: 89px;
      height: 40px;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      outline: 0;
      margin-left: 20px;
      padding: 0;
      border-width: 0px;
      box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5);
      &:hover {
        box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 1);
      }
      &.btn-pressed {
        box-shadow: 0 5px 15px -10px rgba(0, 0, 0, 1) inset;
      }
    }
    .main-menu-icon {
      width: 30px;
      height: 30px;
    }
  }
  #taskbar-left {
    display: flex;
  }
  .task-list {
    display: flex;
    .task-item {
      cursor: pointer;
      background-color: inherit;
      width: 60px;
      height: 40px;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      outline: 0;
      margin-left: 5px;
      padding: 0;
      border-width: 0px;
      box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5);
      .icon-wrap {
        width: auto;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
        img {
          width: auto;
          height: 24px;
        }
      }
      &:hover {
        box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 1);
      }
      &.btn-pressed {
        box-shadow: 0 5px 15px -10px rgba(0, 0, 0, 1) inset;
      }
    }
  }

  #taskbar-right {
    display: flex;
    flex-direction: reverse;
    margin-right: 10px;
    .right-item {
      cursor: pointer;
      margin: 0 8px;
      .icon-wrap {
        width: auto;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
        img {
          width: auto;
          height: 24px;
        }
      }
    }
  }
}
</style>
