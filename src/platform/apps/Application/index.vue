<template>
  <div id="application" ref="application">
    <window v-for="window in windowList" :key="'window_' + window.windowId" :window="window"></window>
  </div>
</template>

<script lang="ts">
import { PlatformModule } from '@/platform/store'
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import Window from '@/platform/apps/Window/index.vue'
@Component({
  name: 'Application',
  components: {
    Window
  }
})
export default class extends Vue {
  @Ref('application')
  private applicationRef: any

  get windowList () {
    return PlatformModule.windowList
  }

  get childWindowList () {
    return PlatformModule.childWindowList
  }
}
</script>

<style lang="less" scoped>
#application {
}
</style>
