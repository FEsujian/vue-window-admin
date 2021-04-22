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
}

export const PlatformModule = getModule(Platform)
