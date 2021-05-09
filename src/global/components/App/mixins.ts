import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'WindowMixin'
})
export default class extends Vue {
  @Prop()
  public window:any

  // mounted () {
  // }

  // beforeDestroy () {
  // }

  // activated () {
  // }
}
