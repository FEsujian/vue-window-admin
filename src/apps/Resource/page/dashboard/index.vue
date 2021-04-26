<template>
  <div class="dashboard">
    1231231231231231
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
@Component({
  name: 'AppCost',
  components: {}
})
export default class extends Vue {
  private active = {
    menu: 'command',
    tab: 'group'
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
.app.cost {
  height: 100%;
  overflow: hidden;
  .app-body {
    display: flex;
    height: 100%;
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
</style>
