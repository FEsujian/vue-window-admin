const path = require('path')
const svgFilePaths = [
  './src/apps/Work/assets/icons'
].map((v) => path.resolve(v))
const tagName = 'SvgIcon'

module.exports = {
  tagName,
  svgFilePath: svgFilePaths,
  svgoConfig: {},
  pathAlias: {
    '@AppWorkIcon': svgFilePaths[0]
  },
  transformAssetUrls: {
    ['svg-icon']: ['data']
  }
}
