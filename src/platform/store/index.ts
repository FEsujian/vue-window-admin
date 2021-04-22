import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/global/store'

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

  @Action
  public openApp (app) {
    if (!app) return
    const { multiple, appid } = app
    if (!appid) return // 处理appid不存在的情况
    if (!multiple && this.openAppList.find(v => v.appid === appid)) return // 处理app多开的情况
    this.OPEN_APP(app)
  }

  @Action
  public closeApp (app) {
    if (!app) return
    const { multiple, appid } = app
    const opendAppIndex = this.openAppList.findIndex(v => v.appid === appid)
    const opendApp = this.openAppList[opendAppIndex]
    if (opendAppIndex <= -1) return
    this.CLOSE_APP({ opendApp, opendAppIndex })
  }
}

export const PlatformModule = getModule(Platform)
