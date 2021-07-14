<template>
  <header>
    <div :class="wrapperClass">
      <span :class="titleClass">
        {{ $props.title === "微信" ? $props.title + "(12)" : $props.title }}
      </span>
      <span :class="iconBoxClass">
        <van-icon name="search" />
        <van-popover
          v-model:show="showPopover"
          :actions="actions"
          theme="dark"
          placement="bottom-end"
        >
          <template #reference><van-icon name="add-o" /></template>
        </van-popover>
      </span>
    </div>
  </header>
</template>

<script lang="ts">
import { ref, computed } from "vue";

const prefixCls = "fwechat";

export default {
  props: {
    title: String,
  },
  setup() {
    const wrapperClass = computed(() => `${prefixCls}-header`);
    const titleClass = computed(() => `${prefixCls}-header-title`);
    const iconBoxClass = computed(() => `${prefixCls}-header-icon-box`);

    const showPopover = ref<boolean>(false);

    const actions = [
      { text: "发起群聊", icon: "chat" },
      { text: "添加朋友", icon: "friends" },
      { text: "扫一扫", icon: "scan" },
      { text: "收付款", icon: "after-sale" },
      { text: "帮助与反馈", icon: "comment" },
    ];

    return {
      wrapperClass,
      titleClass,
      iconBoxClass,
      showPopover,
      actions,
    };
  },
};
</script>

<style lang="less" scoped>
header {
  height: 4rem;
  position: relative;
  z-index: 999;
}
.fwechat {
  &-header {
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f9;
    border-bottom: 1px solid #e8eaec;

    &-title {
      font-weight: 550;
      font-size: 0.9rem;
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
