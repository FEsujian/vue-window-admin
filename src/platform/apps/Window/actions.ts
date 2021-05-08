import { PlatformModule } from '@/platform/store/index'
const defaultWindow = {
  windowId: null,
  parentWindowId: null,
  childWindowId: null,
  type: 'app', // 窗口类型 app or iframe
  url: null, // 如果app类型为iframe 则不能为空
  title: '',
  left: 100, // 窗口位置x
  top: 100, // 窗口位置y
  zIndex: 5000, // 窗口层级
  isActive: false, // 是否是激活窗口
  isChild: false, // 是否是子窗口
  isPopup: false, // 是否是弹出窗口
  hasCaption: true, // 是否含有标题栏
  hasMinimize: true, // 含有最小化按钮
  isMinimize: false, // 是否最小化
  hasMaximize: true, // 含有最大化按钮
  isMaximize: false, // 是否最大化
  hasResizable: false, // 含有还原按钮
  isResizable: false, // 是否还原
  hasClose: false, // 是否可以关闭
  hasSystemMenu: true, // 是否含有左上角菜单 (最大化、最小化、关闭等右键菜单)
  hasBorder: false, // 是否包含边框
  hasShadow: true, // 是否包含阴影
  isVisible: true, // 窗口是否可见
  isDisabled: false, // 窗口是否禁用
  isResize: true, // 是否可以缩放
  resizeConfig: {}, // 缩放配置
  minWidth: 800, // 最小宽度
  minHeight: 600, // 最小高度
  maxWidth: 'unset', // 最大宽度
  maxHeight: 'unset', // 最大高度
  width: 1000, // 当前宽度
  height: 800, // 当前高度
  isDrag: true, // 是否可以拖动
  drag: false, // 拖动状态 拖动 or 未拖动
  dragConfig: {
    x: null,
    y: null
  } // 拖拽配置
}
// 计算窗口层级
const calcZIndex = () => {
  //
}
// 数组位置交换
const swapArray = (arr, index1, index2) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}
// 窗口置顶计算
const zIndexTop = (arr, index) => {
  console.log(arr, index, 'arr')
  // 判断元素位置
  if (index >= arr.length - 1) return arr
  arr.push(arr[index])
  arr.splice(index, 1)
  for (let i = index; i < arr.length; i++) {
    const element = arr[i]
  }
  return arr
}
// 创建窗口
const create = (options: any) => {
  if (!options) return
  const _options: any = {
    ...defaultWindow,
    ...options,
    minimize: () => {
      _options.isMinimize = true
    },
    close: () => {
      PlatformModule.closeWindow(_options.windowId)
      console.log('关闭窗口')
    },
    active: () => {
      _options.isActive = true
      const arr = new Array(...PlatformModule.windowList)
      const newArr = zIndexTop(arr, findIndex(_options.windowId))
      PlatformModule.UPDATE_WINDOW_LIST(newArr)
      console.log(_options.isActive, '窗口已激活')
    },
    inactive: () => {
      _options.isActive = false
      console.log(_options.isActive, '窗口已失活')
    },
    setZIndex: (index) => {
      _options.zIndex = index
      console.log('设置窗口层级')
    }
  }
  // 顶层窗口为3位 10x 子窗口为10x00
  // 是否为子窗口
  if (!options.isChild) {
    _options.windowId = Number('10' + String(PlatformModule.windowList.length + 1))
    if (find(_options.windowId)) {
      _options.windowId++
    }
  } else {
    _options.windowId = Number('10' + String(PlatformModule.windowList.length + 1) + String(PlatformModule.childWindowList.length + 1))
  }
  const windowObj = _options

  PlatformModule.createWindow(windowObj)
  console.log('创建窗口', windowObj)
}
// 销毁窗口
const destory = (windowId: any) => {
  console.log('销毁窗口')
}
// 获取窗口信息
const info = (windowId: any) => {
  if (!windowId) return
  const result = find(windowId)
  console.log('获取窗口信息', result)
  return result
}
// 查找窗口 只能查找顶层窗口
const find = (windowId: any) => {
  if (!windowId) return
  const result = PlatformModule.windowList.find(v => v.windowId === windowId)
  console.log('查找窗口,只能查找顶层窗口', result)
  return result || undefined
}
// 查找窗口 只能查找顶层窗口
const findIndex = (windowId: number) => {
  if (!windowId) return
  const result = PlatformModule.windowList.findIndex(v => v.windowId === windowId)
  // console.log('查找窗口层级,只能查找顶层窗口', result)
  return result
}
// 获取窗口的父窗口
const parent = (windowId: any) => {
  console.log('获取窗口的父窗口,如果不存(顶层)在则返回undefined')
}
// 获取窗口的子窗口
const child = (windowId: any) => {
  console.log('获取窗口的子窗口,如果不存在则返回undefined')
}
// 判断两个窗口是否含有父子关系
const isChild = (parentId: any, childId: any) => {
  console.log('判断两个窗口是否含有父子关系,返回true or false')
}
// 列举所有顶层窗口 不列举子窗口
const enumWindow = (windowId: any) => {
  if (!windowId) return
  const result = PlatformModule.windowList
  console.log('列举所有顶层窗口', result)
  return result || undefined
}
// 列举窗口所有的子窗口
const enumChildWindows = (windowId: any) => {
  console.log('列举窗口所有的子窗口')
}
export default {
  create,
  destory,
  find,
  info,
  parent,
  child,
  isChild,
  enumWindow,
  enumChildWindows
}
