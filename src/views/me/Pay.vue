<template>
  <Transition name="van-slide-right" v-show="show">
    <section :class="wrapperClass">
      <NavBar title="支付" @on-click-left="onBack" />
      <div :class="greenPayBox"></div>
    </section>
  </Transition>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import NavBar from "comps/Navbar.vue";

const prefixCls = "fwechat";

export default {
  components: {
    NavBar,
  },
  setup() {
    const show = ref<boolean>(false);
    const wrapperClass = computed(() => `${prefixCls}-pay`);
    const greenPayBox = computed(() => `${prefixCls}-green-pay-box`);

    setTimeout(() => (show.value = true), 0);

    const onBack = () => {
      show.value = false;
      setTimeout(() => history.back(), 300);
    };

    return {
      show,
      wrapperClass,
      greenPayBox,
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
    position: fixed;
    top: 0;
    left: 0;
    background-color: #efefef;
    z-index: 1250;
  }
}
</style>
