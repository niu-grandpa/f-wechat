<template>
  <Transition name="van-slide-right" v-show="show">
    <section :class="wrapperClass">
      <NavBar title="支付" @on-click-left="onBack" />
      <div :class="greenPayBox">
        <div :class="left">
          <van-icon name="after-sale" />
          <p>收付款</p>
        </div>
        <div :class="right">
          <van-icon name="pending-payment" />
          <p>钱包</p>
          <small>￥999</small>
        </div>
      </div>
      <div :class="cardClass" v-for="c in list" :key="c.title">
        <p class="title">{{ c.title }}</p>
        <van-grid :border="false" clickable>
          <van-grid-item
            v-for="t in c.item"
            :icon="t.icon"
            :text="t.desc"
            :key="t.desc"
          />
        </van-grid>
      </div>
    </section>
  </Transition>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from "vue";
import NavBar from "comps/Navbar.vue";

const prefixCls = "fwechat";

export default {
  components: {
    NavBar,
  },
  setup() {
    const state = reactive({
      show: false,
      wrapperClass: computed(() => `${prefixCls}-pay`),
      greenPayBox: computed(() => `${prefixCls}-pay-green-box`),
      left: computed(() => `${prefixCls}-pay-green-box-left`),
      right: computed(() => `${prefixCls}-pay-green-box-right`),
      cardClass: computed(() => `${prefixCls}-pay-card`),
    });

    setTimeout(() => (state.show = true), 0);

    const list = computed(() => ({
      financial: {
        title: "金融理财",
        item: [
          { icon: "photo", desc: "信用卡还款" },
          { icon: "refund-o", desc: "理财通" },
        ],
      },
      life: {
        title: "生活服务",
        item: [
          { icon: "photo", desc: "手机充值" },
          { icon: "photo", desc: "生活缴费" },
          { icon: "photo", desc: "Q币充值" },
          { icon: "photo", desc: "城市服务" },
          { icon: "photo", desc: "腾讯公益" },
          { icon: "photo", desc: "医疗健康" },
          { icon: "photo", desc: "防疫健康码" },
        ],
      },
      travel: {
        title: "交通出行",
        item: [
          { icon: "photo", desc: "出行服务" },
          { icon: "photo", desc: "火车票机票" },
          { icon: "photo", desc: "滴滴出行" },
          { icon: "photo", desc: "酒店" },
        ],
      },
      shopping: {
        title: "购物消费",
        item: [
          { icon: "photo", desc: "腾讯惠聚" },
          { icon: "photo", desc: "京东购物" },
          { icon: "photo", desc: "美团外卖" },
          { icon: "photo", desc: "电影演出赛事" },
          { icon: "photo", desc: "美团团购" },
          { icon: "photo", desc: "拼多多" },
          { icon: "photo", desc: "蘑菇街女装" },
          { icon: "photo", desc: "唯品会特卖" },
          { icon: "photo", desc: "转转二手" },
          { icon: "photo", desc: "贝壳找房" },
        ],
      },
    }));

    const onBack = () => {
      state.show = false;
      setTimeout(() => history.back(), 300);
    };

    return {
      ...toRefs(state),
      list,
      onBack,
    };
  },
};
</script>

<style lang="less" scoped>
.fwechat {
  &-pay {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #efefef;
    z-index: 1250;
    overflow-y: auto;

    &-green-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 5rem 1rem 5rem;
      border-radius: 6px;
      text-align: center;
      color: #fff;
      background-color: #19be6b;

      &-right {
        margin-top: 21px;
      }

      .van-icon {
        margin-bottom: 0.5rem;
        font-size: 2rem;
      }

      small {
        opacity: 0.5;
      }
    }

    &-card {
      margin: 0.5rem 0;
      padding: 1rem 0;

      border-radius: 6px;
      background-color: #fff;

      .title {
        color: #808695;
        padding-left: 1rem;
        font-size: 12px;
      }
    }
  }
}
</style>
