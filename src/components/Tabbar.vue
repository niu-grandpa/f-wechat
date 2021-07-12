<template>
  <footer>
    <van-tabbar v-model="active" :class="wrapperClass" @change="handleChange">
      <van-tabbar-item icon="chat-o" to="/user/chats">微信</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/user/contacts">通讯录</van-tabbar-item>
      <van-tabbar-item icon="eye-o" to="/user/discover">发现</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/user/me">我</van-tabbar-item>
    </van-tabbar>
  </footer>
</template>

<script lang="ts">
import { ref, computed } from "vue";

const prefixCls = "fwechat";

export default {
  emits: ["on-change"],
  setup(prop: any, context: any) {
    const active = ref<number>(0);
    const wrapperClass = computed(() => `${prefixCls}-tabbar`);

    const handleChange = (active: number) => {
      context.emit("on-change", active);
    };

    return {
      active,
      wrapperClass,
      handleChange,
    };
  },
};
</script>

<style lang="less" scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3.2rem;
}
.fwechat {
  &-tabbar {
    background-color: #f8f8f8;
    border-top: 1px solid #fefefe;
    .van-tabbar-item--active {
      color: rgb(7, 193, 96);
      background-color: inherit;
    }
  }
}
</style>
