import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/global/store'
import bus from '@/global/utils/bus'

@Module({
  name: 'Platform',
  dynamic: true,
  namespaced: true,
  store
})
export default class Platform extends VuexModule {
  public opened: any = {
    mainMenu: false
  }

  public openAppList: any = []
  public openWindowList: any = [] // 已经打开窗口列表

  public activeWindow: any = null;

  public windowList: any = [] // 顶级窗口
  public childWindowList: any = [] // 子级窗口

  // 获取当前激活的窗口
  get ActiveWindow () {
    return undefined
  }

  // 获取排序后的窗口列表
  get sortWindowList () {
    return [...this.windowList].sort((a, b) => {
      return a.openIndex - b.openIndex
    })
  }

  // 通过窗口ID查找窗口
  @Action
  public findWindow (windowId) {
    return undefined
  }

  // 获取窗口的父窗口
  @Action
  public getParentWindow () {
    return undefined
  }

  // 获取窗口的子窗口
  @Action
  public getChildWindow () {
    return undefined
  }

  // 判断两个窗口是否存在父子关系
  @Action
  public isChild (parentWindowId, childWindowId) {
    return undefined
  }

  @Mutation
  public CLOSE_MAIN_MENU (mainMenu: boolean) {
    this.opened.mainMenu = mainMenu
  }

  @Mutation
  public TOGGLE_MAIN_MENU () {
    this.opened.mainMenu = !this.opened.mainMenu
  }

  @Mutation
  public OPEN_APP (app) {
    this.openAppList.push(app)
  }

  @Mutation
  public CLOSE_APP (app) {
    this.openAppList.splice(app.opendAppIndex, 1)
  }

  @Mutation
  public SET_OPEN_WINDOW_LIST (list) {
    this.openWindowList = list
  }

  @Mutation
  public SET_ACTIVE_WINDOW (window) {
    this.activeWindow = window
  }

  // @Action
  // public openApp (app) {
  //   if (!app) return
  //   const { multiple, appid } = app
  //   if (!appid) return // 处理appid不存在的情况
  //   // if (!multiple && this.openAppList.find(v => v.appid === appid)) return // 处理app多开的情况

  //   const opendAppIndex = this.openAppList.findIndex(v => v.appid === appid)
  //   const opendApp = this.openAppList[opendAppIndex]
  //   // 如果App已经打开
  //   if (opendAppIndex > -1) {
  //     this.SET_ACTIVE_WINDOW(app)
  //     bus.$emit('app/window/zIndex', app)
  //     bus.$emit('app/window/active', app)
  //     return
  //   }

  //   this.OPEN_APP(app)
  //   bus.$emit('app/window/zIndex', app)
  //   bus.$emit('app/window/active', app)
  //   this.SET_ACTIVE_WINDOW(app)
  // }

  @Mutation
  public CREATE_WINDOW (window: any) {
    this.windowList.push(window)
  }

  @Mutation
  public UPDATE_WINDOW_LIST (windowList: any = this.windowList) {
    console.log('更新窗口队列')
    console.log(windowList.map(v => {
      return v.windowId
    }))
    // 更新所有窗口层级及激活状态
    windowList.forEach((value, index) => {
      if (this.activeWindow && this.activeWindow.windowId !== value.windowId) value.inactive()
      value.setZIndex(index)
      this.windowList[index] = value
    })
  }

  @Action
  public calcWindowListZIndex () {
    // 计算windowlist层级
  }

  @Action
  // 创建顶级窗口
  public createWindow (options: any) {
    // 已打开窗口判重
    const openedWindowIndex = this.windowList.findIndex(v => v.windowId === options.windowId)
    if (openedWindowIndex > -1) {
      return
    }
    this.CREATE_WINDOW(options)
  }

  @Mutation
  public CREATE_CHILD_WINDOW (window: any) {
    this.childWindowList.push(window)
  }

  // 创建子窗口
  @Action
  public createChildWindow (options: any) {
    // 已打开窗口判重
    const openedWindowIndex = this.childWindowList.findIndex(v => v.windowId === options.windowId)
    if (openedWindowIndex > -1) {
      return
    }
    this.CREATE_CHILD_WINDOW(options)
  }

  @Mutation
  public CLOSE_WINDOW (windowIndex: any) {
    this.windowList.splice(windowIndex, 1)
  }

  @Action
  public closeWindow (windowId: any) {
    // 已打开窗口判重
    const openedWindowIndex = this.windowList.findIndex(v => v.windowId === windowId)
    this.CLOSE_WINDOW(openedWindowIndex)
  }
}

export const PlatformModule = getModule(Platform)
