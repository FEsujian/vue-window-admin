import Vue from 'vue'
import App from './App.vue'
import router from './global/router'
import store from './global/store'
import Vtip from 'vtip'
import 'vtip/lib/index.min.css'
import 'normalize.css'
import bus from '@/global/utils/bus'
import { VueSvgIcon } from '@yzfe/vue-svgicon'
import '@yzfe/svgicon/lib/svgicon.css'
// 注册指令使用
Vue.use(Vtip.directive)
// 工具函数调用
Vue.prototype.$tip = Vtip.tip

// 注册全局bus
Vue.prototype.$bus = bus

Vue.config.productionTip = false

Vue.component('SvgIcon', VueSvgIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
