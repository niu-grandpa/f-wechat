<template>
  <footer>
    <van-tabbar v-model="active" :class="wrapperClass" @change="handleChange">
      <van-tabbar-item name="chats" icon="chat-o" to="/user/chats">微信</van-tabbar-item>
      <van-tabbar-item name="contacts" icon="friends-o" to="/user/contacts">
        通讯录
      </van-tabbar-item>
      <van-tabbar-item name="discover" icon="underway-o" to="/user/discover">
        发现
      </van-tabbar-item>
      <van-tabbar-item name="me" icon="contact" to="/user/me">我</van-tabbar-item>
    </van-tabbar>
  </footer>
</template>

<script lang="ts">
import { ref, computed, watchEffect } from "vue";

const prefixCls = "fwechat";

export default {
  props: {
    active: {
      type: String,
      default: "",
    },
  },
  emits: ["on-change"],
  setup(prop: any, context: any) {
    const active = ref<string>(prop.active);
    const wrapperClass = computed(() => `${prefixCls}-tabbar`);

    const handleChange = (active: string) => {
      context.emit("on-change", active);
    };

    watchEffect(() => {
      active.value = prop.active;
    });

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
    background-color: #fff;
    border-top: 1px solid #e8eaec;
    .van-tabbar-item--active {
      color: rgb(7, 193, 96);
      background-color: inherit;
    }
  }
}
</style>
