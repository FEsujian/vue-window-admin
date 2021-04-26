<template>
  <App class="resource">
    <div class="menu">
      <ul class="menu-list">
        <li
          class="menu-item"
          :class="{active: active.menu === 'dashboard'}"
          @click="checkMenu('dashboard')"
        >概览</li>

        <li
          class="menu-item"
          :class="{active: active.menu === 'instance'}"
          @click="checkMenu('instance')"
        >服务器</li>
        <li class="menu-group-title">网络</li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'vpc'}"
          @click="checkMenu('vpc')"
        >虚拟网络</li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'securityGroup'}"
          @click="checkMenu('securityGroup')"
        >安全组</li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'eip'}"
          @click="checkMenu('eip')"
        >公网IP</li>
        <li class="menu-group-title">存储</li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'disk'}"
          @click="checkMenu('disk')"
        >云硬盘</li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'oss'}"
          @click="checkMenu('oss')"
        >对象存储</li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'snapshot'}"
          @click="checkMenu('snapshot')"
        >快照</li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'image'}"
          @click="checkMenu('image')"
        >镜像</li>
        <li class="menu-group-title">数据库</li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'mysql'}"
          @click="checkMenu('mysql')"
        >MySql</li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'redis'}"
          @click="checkMenu('redis')"
        >Redis</li>
        <li class="menu-group-title">高可靠</li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'autoscale'}"
          @click="checkMenu('autoscale')"
        >弹性伸缩</li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'lbs'}"
          @click="checkMenu('lbs')"
        >负载均衡</li>
      </ul>
    </div>
    <div class="content">
      <component :is="componentId"></component>
    </div>
  </App>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
@Component({
  name: 'AppResource',
  components: {}
})
export default class extends Vue {
  private active = {
    menu: 'dashboard',
    tab: 'group'
  }

  private componentId = ''
  async created () {}

  mounted () {
    this.checkMenu('dashboard')
  }

  // 切换页面
  async checkMenu (active) {
    this.active.menu = active
    const component = await this.$AsyncComponent(
      import(`./page/${this.active.menu}/index.vue`)
    )
    Vue.component('AppResource_' + this.active.menu, component)
    this.componentId = 'AppResource_' + this.active.menu
  }

  // 切换标签
  checkTab (tab) {
    this.active.tab = tab
  }
}
</script>

<style lang="less" scoped>
#resource {
}
</style>
