<template>
  <Transition name="van-slide-right">
    <section v-show="visible" :class="wrapperClass">
      <div :class="closeIconClass">
        <router-link to="/home"><van-icon name="arrow-left" /></router-link>
      </div>
      <div :class="loginBoxClass">
        <h2>{{ $props.title }}</h2>
        <slot />
      </div>
    </section>
  </Transition>
</template>

<script lang="ts">
import { computed, ref } from "vue";

const prefixCls = "fwechat";

export default {
  props: {
    title: {
      type: String,
    },
  },
  setup() {
    const visible = ref<boolean>(false);
    setTimeout(() => (visible.value = true), 0);

    const wrapperClass = computed(() => `${prefixCls}-form-wrapper`);
    const closeIconClass = computed(() => `${prefixCls}-close`);
    const loginBoxClass = computed(() => `${prefixCls}-form-box`);

    return {
      visible,
      wrapperClass,
      closeIconClass,
      loginBoxClass,
    };
  },
};
</script>

<style lang="less" scoped>
.fwechat {
  &-form-wrapper {
    position: relative;
    padding: 8px;
  }
  &-close {
    height: 50px;
    .van-icon {
      font-size: 1.2rem;
    }
  }
  &-form-box {
    padding: 8px;
    h2 {
      font-weight: 500;
      margin-bottom: 26px;
    }
  }
}
</style>
