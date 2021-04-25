<template>
  <App id="money">
    <div class="menu">
      <ul class="menu-list">
        <li
          class="menu-item"
          :class="{active: active.menu === 'summary'}"
          @click="checkMenu('summary')"
        >
          <svg-icon :data="icons.summary" width="22" height="22"></svg-icon>
          <span class="title">账户总览</span>
        </li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'order'}"
          @click="checkMenu('order')"
        >
          <svg-icon :data="icons.order" width="22" height="22"></svg-icon>
          <span class="title">订单管理</span>
        </li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'expense'}"
          @click="checkMenu('expense')"
        >
          <svg-icon :data="icons.expense" width="22" height="22"></svg-icon>
          <span class="title">收支明细</span>
        </li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'invoice'}"
          @click="checkMenu('invoice')"
        >
          <svg-icon :data="icons.invoice" width="22" height="22"></svg-icon>
          <span class="title">发票管理</span>
        </li>
        <li
          class="menu-item"
          :class="{active: active.menu === 'voucher'}"
          @click="checkMenu('voucher')"
        >
          <svg-icon :data="icons.voucher" width="22" height="22"></svg-icon>
          <span class="title">优惠券</span>
        </li>
      </ul>
    </div>
    <div class="content" v-if="active.menu === 'setting'">
      <div class="content-tab">
        <div
          class="tab-item"
          :class="{active: active.tab === 'group'}"
          @click="checkTab('group')"
        >监控组设置</div>
        <div
          class="tab-item"
          :class="{active: active.tab === 'alert'}"
          @click="checkTab('alert')"
        >告警设置</div>
      </div>
    </div>
  </App>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import IconSummary from './assets/svg/summary.svg'
import IconOrder from './assets/svg/order.svg'
import IconExpense from './assets/svg/expense.svg'
import IconInvoice from './assets/svg/invoice.svg'
import IconVoucher from './assets/svg/voucher.svg'
@Component({
  name: 'AppMointor',
  components: {}
})
export default class extends Vue {
  private active = {
    menu: 'summary',
    tab: 'group'
  }

  private icons = {
    summary: IconSummary,
    order: IconOrder,
    expense: IconExpense,
    invoice: IconInvoice,
    voucher: IconVoucher
  }

  // 切换页面
  checkMenu (active) {
    this.active.menu = active
  }

  // 切换标签
  checkTab (tab) {
    this.active.tab = tab
  }
}
</script>

<style lang="less" scoped>
#money {
  height: 100%;
  overflow: hidden;
  .app-body {
    display: flex;
    height: 100%;
    .content {
      flex: 1;
      padding: 0px 10px 0 15px;
    }
    .content-tab {
      font-size: 12px;
      display: flex;
      margin: 5px;
      border-left: 1px solid #eee;
      .tab-item {
        display: block;
        padding: 0 12px;
        text-align: center;
        height: 25px;
        line-height: 25px;
        border-right: 1px solid #eee;
        cursor: pointer;
        color: #666;
        &.active {
          color: #409eff !important;
        }
        &:hover {
          color: #88c7ff;
        }
      }
    }
  }
}
</style>
