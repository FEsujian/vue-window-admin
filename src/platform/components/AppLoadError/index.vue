<template>
  <div class="app-load-error">
    <div class="app-load-error-box">
      <img :src="require('./assets/svg/error.svg')" alt style="width:24px;height:24px;" />
      <span style="margin-left:12px;">加载失败</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppLoadError'
})
export default class extends Vue {}
</script>

<style lang="less" scoped>
.app-load-error {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .app-load-error-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 20px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    // border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    color: rgb(102, 102, 102);
  }
}
</style>
