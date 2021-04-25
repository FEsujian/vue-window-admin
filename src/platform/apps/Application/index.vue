<template>
  <div id="application" ref="application">
    <window
      v-for="app in openAppList"
      :key="'app_window_' + app.appid"
      :app="app"
      :ref="`app_${app.appid}`"
    ></window>
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

  get openAppList () {
    return PlatformModule.openAppList
  }
}
</script>

<style lang="less" scoped>
#application {
}
</style>
