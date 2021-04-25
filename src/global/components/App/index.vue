<template>
  <div class="app">
    <div class="app-body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'App'
})
export default class extends Vue {}
</script>

<style lang="less" scoped>
.app {
  height: 100%;
  overflow: hidden;
  .app-body {
    display: flex;
    height: 100%;
  }
  .menu {
    min-width: 200px;
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
        display: flex;
        align-items: center;
        .icon {
        }
        .title {
          margin-left: 12px;
        }
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
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    padding: 12px;
    .content-body{
      padding: 6px;
    }
  }
}
</style>
