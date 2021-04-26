import AppLoading from '@/platform/components/AppLoading/index.vue'
import AppLoadError from '@/platform/components/AppLoadError/index.vue'
export const AsyncComponent = (component) => () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: new Promise((resolve) => {
    setTimeout(() => {
      resolve(component)
    }, 500)
  }),

  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  loading: AppLoading,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  error: AppLoadError,
  timeout: 3000
})
