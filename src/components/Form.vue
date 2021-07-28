<template>
  <Transition name="van-slide-right">
    <section v-show="visible" :class="wrapperClass">
      <div :class="closeIconClass" @click="onBack">
        <van-icon name="arrow-left" />
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

    const onBack = () => {
      visible.value = false;
      setTimeout(() => history.back(), 300);
    };

    return {
      visible,
      wrapperClass,
      closeIconClass,
      loginBoxClass,
      onBack,
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
