<template>
  <div :class="wrapperClass">
    <van-cell center clickable v-for="n in list" :key="n.user">
      <template #value>
        <sup>{{ n.time }}</sup>
      </template>
      <template #title>
        <Avatar :src="n.src" />
        <div :class="infoClass">
          <h4>{{ n.user }}</h4>
          <small>{{ n.desc }}</small>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script lang="ts">
import { ref, computed, watchEffect } from "vue";
import { Toast } from "vant";
import Avatar from "comps/Avatar.vue";

interface List {
  src: string;
  user: string;
  desc: string;
  time: string;
}

const prefixCls = "fwechat";

export default {
  components: {
    Avatar,
  },
  setup() {
    const wrapperClass = computed(() => `${prefixCls}-chats`);
    const infoClass = computed(() => `${prefixCls}-chats-info`);

    const list = ref<List[]>([]);

    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0,
    });

    fetch("/static/chat_list.json").then((response) => {
      response.json().then((data: List[]) => {
        list.value = data;
        Toast.clear();
      });
    });

    return {
      wrapperClass,
      infoClass,
      list,
    };
  },
};
</script>

<style lang="less" scoped>
.fwechat {
  &-chats {
    &-info {
      width: 100%;
      margin-left: 3.5rem;
      h4 {
        font-family: Arial, Helvetica, sans-serif;
      }
      small {
        font-size: 0.25rem;
        color: #808695;
      }
    }
  }
}
</style>
