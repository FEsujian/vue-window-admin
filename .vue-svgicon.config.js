const path = require('path')
const svgFilePaths = [
  '../src/apps/Work/assets/icons'
].map((v) => path.resolve(v))
const tagName = 'SvgIcon'

module.exports = {
  tagName,
  svgFilePath: svgFilePaths,
  svgoConfig: {},
  pathAlias: {
    '@AppWork': svgFilePaths[0]
  },
  transformAssetUrls: {
    [tagName]: ['data']
  }
}
