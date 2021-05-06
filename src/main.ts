import Vue, { DirectiveOptions } from 'vue'
import Platform from './platform/index.vue'
import router from './global/router'
import store from './global/store'
import Vtip from 'vtip'
import 'vtip/lib/index.min.css'
import 'normalize.css'
import bus from '@/global/utils/bus'
import { AsyncComponent } from '@/global/utils'
import { VueSvgIcon } from '@yzfe/vue-svgicon'
import '@yzfe/svgicon/lib/svgicon.css'
import App from '@/global/components/App/index.vue'
import Button from '@/global/components/Button/index.vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import '@/global/style/index.less'
// import * as directives from '@/global/directives/index'
import * as filters from '@/global/filters/index'
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
Vue.prototype.$AsyncComponent = AsyncComponent

Vue.config.productionTip = false

Vue.component('SvgIcon', VueSvgIcon)
Vue.component('App', App)
Vue.component('AcButton', Button)

// 注册全局自定义指令
// Object.keys(directives).forEach((key) => {
//   Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
// })

// 注册全局自定义过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, (filters as { [key: string]: Function })[key])
})

new Vue({
  router,
  store,
  render: h => h(Platform)
}).$mount('#app')
