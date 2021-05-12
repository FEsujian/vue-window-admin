import { PlatformModule } from '@/platform/store/index'
// 创建窗口
const create = async (options: any, parentWindow?) => {
  console.log(options, 'options')
  if (!options) return
  let _windowObj: any = new XWindow(options, parentWindow)
  try {
    const window = await _windowObj.create()
    window.active()
    console.log('创建窗口', _windowObj)
  } catch (error) {
    _windowObj = null
    console.error(error)
  }
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
  private childWindow = null
  appid = null
  windowId = null
  parentWindowId = null
  childWindowId = null
  type = 'app' // 窗口类型 app or iframe
  url = null // 如果app类型为iframe 则不能为空
  title = ''
  left = 100 // 窗口位置x
  top = 100 // 窗口位置y
  zIndex = 5000 // 窗口层级
  hasMulti = false // 是否允许多开
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
  minWidth = 600 // 最小宽度
  minHeight = 500 // 最小高度
  maxWidth = 'unset' // 最大宽度
  maxHeight = 'unset' // 最大高度
  width = 800 // 当前宽度
  height = 600 // 当前高度
  isDrag = true // 是否可以拖动
  drag = false // 拖动状态 拖动 or 未拖动
  openIndex = null // 打开顺序
  isBackgroudTip = false // 背景闪动提示
  dragConfig = {
    x: null,
    y: null
  } // 拖拽配置

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
        title: parentWindow.name + ' | 子窗口 ',
        isChild: true,
        parentWindowId: parentWindow.windowId,
        zIndex: Number(parentWindow.zIndex + 1),
        width: 400,
        height: 300,
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
      this.windowId = Number(String(parentWindow.windowId) + String(PlatformModule.childWindowList.length + 1))
      parentWindow.childWindow = this
      parentWindow.childWindowId = this.windowId
    }
  }

  // 窗口创建
  public create () {
    return new Promise((resolve, reject) => {
      const opendWindow = PlatformModule.windowList.find(v => v.appid === this.appid)
      if (!this.hasMulti && opendWindow) {
        reject(new Error('该窗口不允许多开_' + opendWindow.appid))
        return
      }
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
      resolve(this)
    })
  }

  // 窗口关闭
  public close () {
    // 如果关闭的是子窗口
    if (this.isChild) {
      console.log('关闭的是子窗口_', this)
      PlatformModule.CLOSE_WINDOW(this)
      this.parentWindow.childWindow = null
      this.parentWindow.childWindowId = null
      this.parentWindow.active()
    } else {
      // 如果当前激活窗口被关闭，则重新设置激活窗口
      if (PlatformModule.activeTopWindow && PlatformModule.activeTopWindow.windowId === this.windowId) {
        // 寻找最高层级的窗口，重新设置激活窗口
        const maxZIndexWindow = PlatformModule.windowList.reduce((a, b) => {
          return b.zIndex > a.zIndex ? b : a
        })
        maxZIndexWindow.active()
      }
      PlatformModule.CLOSE_WINDOW(this)
    }
  }

  // 窗口激活
  public active (isClick = false) {
    const arr = new Array(...PlatformModule.windowList)
    // 若点击子窗口，则激活设置activeWindow为子窗口，查找其主窗口并设置activeTopWindow为主窗口
    if (this.isChild) {
      console.log('子级窗口激活')
      const parentWindow = this.parent()
      console.log('子窗口的父窗口_' + parentWindow.windowId)
      parentWindow.isActive = false
      const newArr = zIndexTop(arr, findIndex(parentWindow.windowId))
      PlatformModule.SET_ACTIVE_TOP_WINDOW(parentWindow)
      PlatformModule.SET_ACTIVE_WINDOW(this)
      PlatformModule.UPDATE_WINDOW_LIST(newArr)
      this.isActive = true
      this.zIndex = Number(parentWindow.zIndex + 1)
    } else {
      console.log('顶级窗口激活')
      if (this.isMinimize) this.isMinimize = false
      if (this.isActive) return
      const newArr = zIndexTop(arr, findIndex(this.windowId))
      console.log(newArr.map(v => v.windowId), '重新排序之后的数组')
      PlatformModule.SET_ACTIVE_TOP_WINDOW(this)
      PlatformModule.UPDATE_WINDOW_LIST(newArr)
      // 1. 如果点击顶级窗口 设置其余窗口及其子窗口为inactive
      // 2. 若存在子窗口，则激活设置activeWindow为子窗口并触发窗口backgroupTip，设置activeTopWindow为主窗口
      if (this.childWindowId) {
        const childWindow = this.childWindow
        childWindow.isActive = true
        childWindow.zIndex = Number(this.zIndex + 1)
        this.isActive = false
        console.log(isClick, 'isClick')
        if (isClick) {
          childWindow.backgroundTip()
        }
      } else {
        this.isActive = true
      }
      console.log(this.isActive, '窗口已激活_' + this.windowId)
    }
  }

  // 窗口失活
  public inactive () {
    this.isActive = false
    // 如果失活顶级窗口同时失活子集窗口
    if (this.childWindowId) {
      const childWindow = this.childWindow
      console.log('失活窗口存在子窗口_' + childWindow.windowId)
      console.log('Number(this.zIndex + 1)', Number(this.zIndex + 1))
      childWindow.zIndex = Number(this.zIndex + 1)
    }
    console.log(this.isActive, '窗口已失活_' + this.windowId)
  }

  // 窗口背景闪动提示
  public backgroundTip () {
    console.log('闪动窗口_' + this.windowId)
    this.isBackgroudTip = true
    setTimeout(() => {
      this.isBackgroudTip = false
    }, 600)
  }

  // 返回父级窗口 如果没有则返回null
  public parent () {
    if (this.parentWindowId) {
      return this.parentWindow
    }
    return null
  }

  // 返回子级窗口 如果没有则返回null
  public child () {
    if (this.childWindowId) {
      return this.childWindow
    }
    return null
  }

  // 更新窗口层级
  public setZIndex (index) {
    if (this.isChild) {
      const parentWindow = this.parentWindow
      this.zIndex = Number(parentWindow.zIndex + 1)
    } else {
      this.zIndex = Number('50' + index + '0')
    }

    console.log('设置窗口层级')
  }

  // 窗口最大化
  public maximize () {
    // 如果没有最小化功能
    if (!this.hasMaximize) return
    this.isMaximize = true
  }

  // 窗口最小化
  public minimize () {
    // 如果没有最小化功能
    if (!this.hasMinimize) return
    this.isMinimize = true
    this.inactive()
    // 任务栏窗口大于1
    if (PlatformModule.windowList.length > 1) {
      // 寻找ZIndex最大的window并且激活
      const maxZIndexWindow = PlatformModule.windowList.reduce((a, b) => {
        return b.zIndex > a.zIndex &&
          b.windowId !== this.windowId &&
          !b.isMinimize
          ? b
          : a
      })
      if (maxZIndexWindow.isMinimize) {
        PlatformModule.SET_ACTIVE_TOP_WINDOW(null)
        return
      }
      maxZIndexWindow.active()
    }
  }

  // 窗口还原
  public restore () {
    if (this.isMaximize) this.isMaximize = false
    if (this.isMinimize) this.isMinimize = false
  }
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
