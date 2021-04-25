const path = require('path')
const svgFilePaths = [
  './src/global/assets/svg',
  './src/apps/Work/assets/icons',
  './src/apps/Message/assets/svg',
  './src/apps/Physical/assets/svg',
  './src/apps/Security/assets/svg',
  './src/apps/Monitor/assets/svg',
  './src/apps/WorkOrder/assets/svg',
  './src/apps/Money/assets/svg',
  './src/platform/apps/Window/assets/svg'
].map((v) => path.resolve(v))
const tagName = 'SvgIcon'

module.exports = {
  tagName,
  svgFilePath: svgFilePaths,
  svgoConfig: {},
  pathAlias: {
    '@svg': svgFilePaths[0]
  },
  transformAssetUrls: {
    ['svg-icon']: ['data']
  }
}
