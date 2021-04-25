<template>
  <button class="ac-button" :class="buttonClass">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'AcButton'
})
export default class extends Vue {
  @Prop({ default: 'default' })
  private type

  @Prop({ default: 'mini' })
  private size

  get buttonClass () {
    return [this.type, this.size]
  }
}
</script>

<style lang="less" scoped>
.ac-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  // transition: 0.1s;
  font-weight: 400;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  &:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  &.active {
    background: #3a8ee6;
    border-color: #3a8ee6;
    color: #fff;
  }
  &.primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;

    &:hover {
      background: #66b1ff;
      border-color: #66b1ff;
      color: #fff;
    }
    &:active {
      background: #3a8ee6 !important;
      border-color: #3a8ee6 !important;
      color: #fff;
    }
  }
  &.mini {
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 3px;
  }
}
</style>
