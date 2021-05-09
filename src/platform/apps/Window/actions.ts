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

// 窗口置顶计算
const zIndexTop = (arr, index) => {
  console.log('计算之前的位置信息', arr.map(v => {
    return v.windowId
  }))
  // 判断元素位置
  if (index >= arr.length - 1) return arr
  arr.push(arr[index])
  arr.splice(index, 1)
  return arr
}
// 创建窗口
const create = (options: any, parentWindow?) => {
  if (!options) return
  const _windowObj: any = new XWindow(options, parentWindow)
  _windowObj.create()
  _windowObj.active()
  console.log('创建窗口', _windowObj)
  // const _options: any = {
  //   ...defaultWindow,
  //   ...options,
  //   openIndex: PlatformModule.windowList.length,
  //   createChild: () => {
  //     const childOption = {
  //       windowId: Number(String(this.windowId) + '00'),
  //       title: this.title + '| 子窗口',
  //       isChild: true,
  //       parentWindowId: this.windowId,
  //       zIndex: Number(this.zIndex + 1),
  //       width: 400,
  //       height: 400,
  //       minWidth: 0,
  //       minHeight: 0
  //     }
  //     const childWindowObj = {
  //       ..._options,
  //       ...childOption,
  //       left: Number(this.left + this.width / 2 - childOption.width / 2),
  //       top: Number(this.top + this.height / 2 - childOption.height / 2)
  //     }
  //     this.childWindowId = childWindowObj.windowId
  //     _this = childWindowObj
  //     childWindowObj.active()
  //     PlatformModule.createChildWindow(childWindowObj)
  //     PlatformModule.UPDATE_WINDOW_LIST()
  //   }, // 创建子窗口
  //   parent: () => {
  //     console.log(_this, '_this')
  //     // if (!this.parentWindowId) return
  //     return getParent(this.parentWindowId)
  //   },
  //   minimize: () => {
  //     this.isMinimize = true
  //   },
  //   close: () => {
  //     // 如果当前激活窗口被关闭，则重新设置激活窗口
  //     if (PlatformModule.activeWindow && PlatformModule.activeWindow.windowId === this.windowId) {
  //       // 寻找最高层级的窗口，重新设置激活窗口
  //       const maxZIndexWindow = PlatformModule.windowList.reduce((a, b) => {
  //         return b > a ? b : a
  //       })
  //       maxZIndexWindow.active()
  //     }
  //     PlatformModule.closeWindow(this.windowId)
  //   },
  //   active: () => {
  //     if (PlatformModule.activeWindow && PlatformModule.activeWindow.windowId === this.windowId) return
  //     const arr = new Array(...PlatformModule.windowList)
  //     const newArr = zIndexTop(arr, findIndex(this.windowId))
  //     this.isActive = true
  //     PlatformModule.SET_ACTIVE_WINDOW(_options)
  //     PlatformModule.UPDATE_WINDOW_LIST(newArr)
  //     console.log(this.isActive, '窗口已激活')
  //   },
  //   inactive: () => {
  //     this.isActive = false
  //     console.log(this.isActive, '窗口已失活')
  //   },
  //   setZIndex: (index) => {
  //     this.zIndex = Number('50' + index + '0')
  //     console.log('设置窗口层级')
  //   }
  // }
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
const getParent = (parentWindowId: any) => {
  if (!parentWindowId) return
  console.log(parentWindowId, 'parentWindowId')
  const result = PlatformModule.windowList.find(v => v.windowId === parentWindowId) || PlatformModule.childWindowList.find(v => v.windowId === parentWindowId)
  // console.log('查找窗口层级,只能查找顶层窗口', result)
  console.log('获取窗口的父窗口,如果不存(顶层)在则返回undefined')
  return result
}
// 获取窗口的子窗口
const getChild = (windowId: any) => {
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

// 窗口对象
class XWindow {
  private parentWindow = null
  windowId = null
  parentWindowId = null
  childWindowId = null
  type = 'app' // 窗口类型 app or iframe
  url = null // 如果app类型为iframe 则不能为空
  title = ''
  left = 100 // 窗口位置x
  top = 100 // 窗口位置y
  zIndex = 5000 // 窗口层级
  isActive = false // 是否是激活窗口
  isChild = false // 是否是子窗口
  isPopup = false // 是否是弹出窗口
  hasCaption = true // 是否含有标题栏
  hasMinimize = true // 含有最小化按钮
  isMinimize = false // 是否最小化
  hasMaximize = true // 含有最大化按钮
  isMaximize = false // 是否最大化
  hasResizable = false // 含有还原按钮
  isResizable = false // 是否还原
  hasClose = false // 是否可以关闭
  hasSystemMenu = true // 是否含有左上角菜单 (最大化、最小化、关闭等右键菜单)
  hasBorder = false // 是否包含边框
  hasShadow = true // 是否包含阴影
  isVisible = true // 窗口是否可见
  isDisabled = false // 窗口是否禁用
  isResize = true // 是否可以缩放
  resizeConfig = {} // 缩放配置
  minWidth = 800 // 最小宽度
  minHeight = 600 // 最小高度
  maxWidth = 'unset' // 最大宽度
  maxHeight = 'unset' // 最大高度
  width = 1000 // 当前宽度
  height = 800 // 当前高度
  isDrag = true // 是否可以拖动
  drag = false // 拖动状态 拖动 or 未拖动
  openIndex = null // 打开顺序
  dragConfig = {
    x: null,
    y: null
  } // 拖拽配置

  // 更新窗口层级
  public setZIndex (index) {
    this.zIndex = Number('50' + index + '0')
    console.log('设置窗口层级')
  }

  // 窗口最大化
  public maximize () {
    //
  }

  // 窗口最小化
  public minimize () {
    //
  }

  // 窗口还原
  public resizable () {
    //
  }

  constructor (options, parentWindow?) {
    this.init(options, parentWindow)
  }

  // 初始化窗口选项
  private init (options: any = {}, parentWindow?) {
    // 初始化参数
    let _options: any = {
    }
    // 如果存在父级窗口,则创建窗口为子窗口
    if (parentWindow) {
      this.parentWindow = parentWindow
      // 默认子窗口配置
      const DefChildOption = {
        title: parentWindow.name + ' | 子窗口',
        isChild: true,
        parentWindowId: parentWindow.windowId,
        zIndex: Number(parentWindow.zIndex + 1),
        width: 400,
        height: 400,
        minWidth: 0,
        minHeight: 0,
        openIndex: null,
        hasMaximize: false,
        hasMinimize: false,
        left: Number(parentWindow.left + parentWindow.width / 2 - (options.width | 400) / 2),
        top: Number(parentWindow.top + parentWindow.height / 2 - (options.height | 400) / 2)
      }
      // 初始化合并参数
      _options = {
        ...options,
        ...DefChildOption
      }
    } else {
      // 创建顶级窗口
      options.openIndex = PlatformModule.windowList.length
      _options = {
        ...options
      }
    }
    for (const key in _options) {
      if (Object.prototype.hasOwnProperty.call(_options, key)) {
        const element = _options[key]
        this[key] = element
      }
    }
  }

  // 窗口销毁
  private destory () {
    //
  }

  // 生成windowId
  private generateWindowId (parentWindow?) {
    // 顶层窗口为3位 10x 子窗口为10x00
    // 是否为子窗口
    if (!this.isChild) {
      this.windowId = Number('10' + String(PlatformModule.windowList.length + 1))
      if (find(this.windowId)) {
        this.windowId++
      }
    } else {
      this.windowId = Number('10' + String(PlatformModule.windowList.length + 1) + String(PlatformModule.childWindowList.length + 1))
      parentWindow.childWindowId = this.windowId
    }
  }

  // 窗口创建
  public create () {
    // 生成windowId
    this.generateWindowId(this.parentWindow)
    if (this.isChild) {
      // 推送至子窗口队列
      PlatformModule.CREATE_CHILD_WINDOW(this)
    } else {
      // 推送至窗口队列
      PlatformModule.CREATE_WINDOW(this)
    }

    // 更新所有窗口层级
    PlatformModule.UPDATE_WINDOW_LIST()
  }

  // 窗口关闭
  public close () {
    // 如果当前激活窗口被关闭，则重新设置激活窗口
    if (PlatformModule.activeWindow && PlatformModule.activeWindow.windowId === this.windowId) {
      // 寻找最高层级的窗口，重新设置激活窗口
      const maxZIndexWindow = PlatformModule.windowList.reduce((a, b) => {
        return b > a ? b : a
      })
      maxZIndexWindow.active()
    }
    PlatformModule.closeWindow(this.windowId)
  }

  // 窗口激活
  public active () {
    if (PlatformModule.activeWindow && PlatformModule.activeWindow.windowId === this.windowId) return
    const arr = new Array(...PlatformModule.windowList)
    const newArr = zIndexTop(arr, findIndex(this.windowId))
    this.isActive = true
    PlatformModule.SET_ACTIVE_WINDOW(this)
    PlatformModule.UPDATE_WINDOW_LIST(newArr)
    console.log(this.isActive, '窗口已激活_' + this.windowId)
  }

  // 窗口失活
  public inactive () {
    this.isActive = false
    console.log(this.isActive, '窗口已失活_' + this.windowId)
  }

  // 返回父级窗口 如果没有则返回null
  public parent () {
    return null
  }

  // 返回子级窗口 如果没有则返回null
  public child () {
    return null
  }
}
export default {
  create,
  destory,
  find,
  info,
  getParent,
  getChild,
  isChild,
  enumWindow,
  enumChildWindows
}
