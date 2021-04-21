<template>
  <Platform />
</template>
<script lang="ts">
import Platform from '@/platform/index.vue'
import Vue from 'vue'
export default Vue.extend({
  components: {
    Platform
  }
})
</script>
<style lang="less">
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
