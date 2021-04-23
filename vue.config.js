/* eslint-disable */
const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: process.env.NODE_ENV !== 'production',
  devServer: {
    port: 8081,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    progress: false,
    disableHostCheck: true
  },
  pages: {
    index: {
      entry: 'src/main.ts',
      title: ''
    }
  },
  chainWebpack: (config) => {
    // 别名设置
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('assets', resolve('src/global/assets'))
      .set('~', resolve('node_modules'))
      .set('@', resolve('src'));
  }
}
