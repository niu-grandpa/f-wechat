<template>
  <footer>
    <van-tabbar v-model="active" :class="wrapperClass" @change="handleChange">
      <van-tabbar-item v-for="n in list" :name="n.text" :icon="n.icon" :key="n.text">
        {{ n.text }}
      </van-tabbar-item>
    </van-tabbar>
  </footer>
</template>

<script lang="ts">
import { ref, computed } from "vue";

interface List {
  icon: string;
  text: string;
}

const prefixCls = "fwechat";

export default {
  emits: ["on-change"],
  setup(prop: any, context: any) {
    const active = ref<string>("微信");
    const wrapperClass = computed(() => `${prefixCls}-tabbar`);
    const handleChange = (active: string) => context.emit("on-change", active);
    const list: List[] = [
      {
        icon: "chat-o",
        text: "微信",
      },
      {
        icon: "friends-o",
        text: "通讯录",
      },
      {
        icon: "underway-o",
        text: "发现",
      },
      {
        icon: "contact",
        text: "我",
      },
    ];

    return {
      active,
      list,
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
