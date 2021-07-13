<template>
  <div :class="wrapperClass">
    <div :class="avatarClass">
      <van-image round width="60" height="60" fill="cover" alt="头像" :src="src" />
    </div>
    <div :class="infoBoxClass"></div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";

const prefixCls = "fwechat";

export default {
  setup() {
    const wrapperClass = computed(() => `${prefixCls}-me`);
    const avatarClass = computed(() => `${prefixCls}-me-avatar`);
    const infoBoxClass = computed(() => `${prefixCls}-me-info`);

    const src = ref<string>("https://img.yzcdn.cn/vant/cat.jpeg");

    return {
      wrapperClass,
      avatarClass,
      infoBoxClass,
      src,
    };
  },
};
</script>

<style lang="less" scoped>
.fwechat {
  &-me {
    display: flex;
    padding: 0 24px;
    background-color: #fff;

    &-avatar {
      margin-right: 12px;
    }

    &-info {
      flex: 1;
    }
  }
}
</style>
