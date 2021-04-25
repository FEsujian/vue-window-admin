<template>
  <div class="app-loading">
    <div class="app-loading-box">
      <img :src="require('./assets/svg/loading.svg')" alt style="width:36px;height:36px;" />
      <span style="margin-left:12px;">加载中...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppLoading'
})
export default class extends Vue {}
</script>

<style lang="less" scoped>
.app-loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .app-loading-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 20px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    // border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    color: rgb(102, 102, 102);
  }
}
</style>
