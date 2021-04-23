declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
  interface Vue {
    $bus: any
  }
}

declare module '*.json' {
  const value: any
  export default value
}
declare module '*.svg' {
  const value: any
  export default value
}

declare module 'vtip'
declare module 'vue-grid-layout'
