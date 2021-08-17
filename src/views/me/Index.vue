<template>
  <Transition name="van-slide-left">
    <div :class="wrapperClass">
      <UserInfo />
      <Divider />
      <van-cell id="fwechat-cell" title="支付" is-link :to="payPath">
        <template #icon><van-icon color="#19be6b" name="certificate" /></template>
      </van-cell>
      <Divider />
      <van-cell id="fwechat-cell" title="收藏" is-link>
        <template #icon><van-icon color="#2db7f5" name="gem-o" /></template>
      </van-cell>
      <van-cell id="fwechat-cell" title="朋友圈" is-link>
        <template #icon><van-icon color="#2b85e4" name="photo-o" /></template>
      </van-cell>
      <van-cell id="fwechat-cell" title="卡包" is-link>
        <template #icon><van-icon color="#5cadff" name="peer-pay" /></template>
      </van-cell>
      <van-cell id="fwechat-cell" title="表情" is-link>
        <template #icon><van-icon color="#ff9900" name="smile-o" /></template>
      </van-cell>
      <Divider />
      <van-cell id="fwechat-cell" title="设置" is-link :to="settingPath">
        <template #icon><van-icon color="#2d8cf0" name="setting-o" /></template>
      </van-cell>
    </div>
  </Transition>
</template>

<script lang="ts">
import { computed } from "vue";
import Divider from "comps/Divider.vue";
import UserInfo from "../../components/UserInfo.vue";

const prefixCls = "fwechat";

export default {
  components: {
    Divider,
    UserInfo,
  },
  setup() {
    const wrapperClass = computed(() => `${prefixCls}-me`);

    // route path
    const payPath = computed(() => "/user/pay");
    const settingPath = computed(() => "/user/setting");

    return {
      wrapperClass,
      payPath,
      settingPath,
    };
  },
};
</script>

<style lang="less" scoped>
#fwechat-cell {
  i {
    margin-top: 0.15rem;
    margin-right: 1rem;
    font-size: 1.2rem;
  }
}
</style>
