import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/global/store'
@Module({
  name: 'User',
  dynamic: true,
  namespaced: true,
  store
})
export default class User extends VuexModule {
  public userInfo: any = {};
}

export const UserModule = getModule(User)
