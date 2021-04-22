<template>
  <div id="application">
    <window v-for="app in openAppList" :key="'app_window_' + app.appid" :app="app"></window>
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
  get openAppList () {
    return PlatformModule.openAppList
  }
}
</script>

<style lang="less" scoped>
#application {
}
</style>
