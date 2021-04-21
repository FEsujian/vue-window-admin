declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
  interface Vue {
    $bus: any
  }
}

declare module 'vtip'
declare module 'vue-grid-layout'
