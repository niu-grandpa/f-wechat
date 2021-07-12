<template>
  <div :class="wrapperClass">
    <van-cell title="朋友圈" icon="gem-o" is-link />
    <div :class="dividerClass" />
    <van-cell title="扫一扫" icon="scan" is-link />
    <div :class="dividerClass" />
    <van-cell title="看一看" icon="aim" is-link />
    <van-cell title="搜一搜" icon="flower-o" is-link />
  </div>
</template>

<script lang="ts">
import { computed } from "vue";

const prefixCls = "fwechat";

export default {
  setup() {
    const wrapperClass = computed(() => `${prefixCls}-discover`);
    const dividerClass = computed(() => `${prefixCls}-divider`);

    return {
      wrapperClass,
      dividerClass,
    };
  },
};
</script>

<style lang="less" scoped>
.fwechat {
  &-divider {
    height: 8px;
  }
}
</style>
