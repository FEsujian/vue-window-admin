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

  public activeApp: any = null;
  public activeWindow: any = null;

  public windowList: any = [] // 顶级窗口
  public childWindowList: any = [] // 子级窗口

  // 获取当前激活的窗口
  get ActiveWindow () {
    return undefined
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
  public SET_ACTIVE_APP (app) {
    this.activeApp = app
  }

  @Action
  public openApp (app) {
    if (!app) return
    const { multiple, appid } = app
    if (!appid) return // 处理appid不存在的情况
    // if (!multiple && this.openAppList.find(v => v.appid === appid)) return // 处理app多开的情况

    const opendAppIndex = this.openAppList.findIndex(v => v.appid === appid)
    const opendApp = this.openAppList[opendAppIndex]
    // 如果App已经打开
    if (opendAppIndex > -1) {
      this.SET_ACTIVE_APP(app)
      bus.$emit('app/window/zIndex', app)
      bus.$emit('app/window/active', app)
      return
    }

    this.OPEN_APP(app)
    bus.$emit('app/window/zIndex', app)
    bus.$emit('app/window/active', app)
    this.SET_ACTIVE_APP(app)
  }

  @Mutation
  public CREATE_WINDOW (window: any) {
    this.windowList.push(window)
  }

  @Action
  public createWindow (options: any) {
    // 已打开窗口判重
    const openedWindowIndex = this.windowList.findIndex(v => v.windowId === options.windowId)
    if (openedWindowIndex > -1) {
      return
    }
    this.CREATE_WINDOW(options)
  }

  @Action
  public closeApp (app) {
    if (!app) return

    const { multiple, appid } = app
    const opendAppIndex = this.openAppList.findIndex(v => v.appid === appid)
    const opendApp = this.openAppList[opendAppIndex]
    if (opendAppIndex <= -1) return

    this.CLOSE_APP({ opendApp, opendAppIndex })
    if (this.activeApp.appid === app.appid) {
      this.SET_ACTIVE_APP(this.openAppList[0])
    }
  }
}

export const PlatformModule = getModule(Platform)
