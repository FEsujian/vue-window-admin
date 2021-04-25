import Vue from 'vue'
import Platform from './platform/index.vue'
import router from './global/router'
import store from './global/store'
import Vtip from 'vtip'
import 'vtip/lib/index.min.css'
import 'normalize.css'
import bus from '@/global/utils/bus'
import { VueSvgIcon } from '@yzfe/vue-svgicon'
import '@yzfe/svgicon/lib/svgicon.css'
import App from '@/global/components/App/index.vue'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
VXETable.setup({
  size: 'mini',
  zIndex: 5500
})
Vue.use(VXETable)

// 注册指令使用
Vue.use(Vtip.directive)
// 工具函数调用
Vue.prototype.$tip = Vtip.tip

// 注册全局bus
Vue.prototype.$bus = bus

Vue.config.productionTip = false

Vue.component('SvgIcon', VueSvgIcon)
Vue.component('App', App)

new Vue({
  router,
  store,
  render: h => h(Platform)
}).$mount('#app')
