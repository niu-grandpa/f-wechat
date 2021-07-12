<template>
  <header>
    <div :class="wrapperClass">
      <span :class="titleClass">{{ $props.title }}</span>
      <span :class="iconBoxClass">
        <van-icon name="search" />
        <van-icon name="add-o" />
      </span>
    </div>
  </header>
</template>

<script lang="ts">
import { computed } from "vue";

const prefixCls = "fwechat";

export default {
  props: {
    title: String,
  },
  setup() {
    const wrapperClass = computed(() => `${prefixCls}-header`);
    const titleClass = computed(() => `${prefixCls}-header-title`);
    const iconBoxClass = computed(() => `${prefixCls}-header-icon-box`);

    return {
      wrapperClass,
      titleClass,
      iconBoxClass,
    };
  },
};
</script>

<style lang="less" scoped>
header {
  height: 3.5rem;
  position: relative;
  z-index: 999;
}
.fwechat {
  &-header {
    width: 100%;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #f8f8f9;

    &-title {
      font-weight: 550;
      font-size: 1rem;
    }

    &-icon-box {
      position: absolute;
      right: 1rem;
      i {
        font-size: 1.2rem;
        vertical-align: middle;
        cursor: pointer;
        &:last-child {
          margin-left: 1rem;
        }
      }
    }
  }
}
</style>
