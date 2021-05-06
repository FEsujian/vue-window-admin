import dayjs from 'dayjs'

const Corp = {
  tcs: '腾讯云',
  acs: '阿里云',
  aws: 'AWS',
  hws: '华为云',
  ucs: 'UCloud',
  azure: 'Azure',
  vmware: 'Vmware',
  openstack: 'OpenStack',
  tstack: 'TStack',
  yovole: '有孚云',
  ucs_edu: 'Ucloud',
  hws_edu: '华为专属云'
}

export const formatCorpToCN = (corp: string) => {
  if (!corp) {
    return '--'
  } else return Corp[corp]
}

// 手机号脱敏
export const encryptPhone = (phone: string) => {
  if (!phone || phone === '') return '--'
  if (phone.length < 4) return phone
  return phone.substr(0, 3) + '****' + phone.substr(-4)
}

// 转换为日期 默认是YYYY-MM-DD
export const formatDate = (date, type = 'YYYY-MM-DD') => {
  if (!date || date === '') return
  return dayjs(date).format(type)
}

// 转换为日期 默认是YYYY-MM-DD HH:mm:ss
export const formatDateTime = (date, type = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date || date === '') return
  return dayjs(date).format(type)
}

// 比特转单位
export const bytesFormat = (bytes) => {
  let size = ''
  if (bytes < 0.1 * 1024) { // 小于0.1KB，则转化成B
    size = bytes.toFixed(2) + ' B'
  } else if (bytes < 0.1 * 1024 * 1024) { // 小于0.1MB，则转化成KB
    size = (bytes / 1024).toFixed(2) + ' KB'
  } else if (bytes < 0.1 * 1024 * 1024 * 1024) { // 小于0.1GB，则转化成MB
    size = (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  } else { // 其他转化成GB
    size = (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
  }

  const sizeStr = size + '' // 转成字符串
  const index = sizeStr.indexOf('.') // 获取小数点处的索引
  const dou = sizeStr.substr(index + 1, 2) // 获取小数点后两位的值
  if (dou === '00') { // 判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size
}
