<template>
  <section style="z-index: 9999">
    <transition name="van-fade">
      <div v-if="visible" :class="homeClass" />
    </transition>
    <div :class="btnBoxClass">
      <router-link to="/login">
        <van-button type="success">登录</van-button>
      </router-link>
      <router-link to="/register">
        <van-button style="color: rgb(7, 193, 96">注册</van-button>
      </router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, ref } from "vue";

const prefixCls = "fwechat";

export default {
  setup() {
    const visible = ref<boolean>(false);
    setTimeout(() => {
      visible.value = true;
    }, 0);

    const homeClass = computed(() => `${prefixCls}-home-bg`);
    const btnBoxClass = computed(() => `${prefixCls}-btn-box`);

    return {
      visible,
      homeClass,
      btnBoxClass,
    };
  },
};
</script>

<style lang="less" scoped>
.fwechat {
  &-home-bg {
    width: 100%;
    height: calc(100vh);
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("@/assets/home-bg.jpg");
    background-size: cover;
    background-position: center;
  }
  &-btn-box {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 16px;
    a {
      button {
        height: 38px;
        padding: 0 36px;
        display: inline-block;
      }
      &:last-child {
        float: right;
      }
    }
  }
}
</style>
