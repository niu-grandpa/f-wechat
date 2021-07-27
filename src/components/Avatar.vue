<template>
  <div class="avatar">
    <van-badge :content="count" :show-zero="false">
      <img
        :width="width"
        :height="height"
        :src="src"
        alt="avatar"
        style="object-fit: cover"
        v-lazy="src"
      />
    </van-badge>
  </div>
</template>

<script lang="ts">
import { ref, watchEffect } from "vue";

interface Props {
  width: number;
  height: number;
  src: string;
  badgeCount: number;
}

export default {
  props: {
    width: {
      type: Number,
      default: 43,
    },
    height: {
      type: Number,
      default: 43,
    },
    src: {
      type: String,
      default: "https://img.yzcdn.cn/vant/cat.jpeg",
    },
    badgeCount: {
      type: Number,
      default: 0,
    },
  },
  setup(props: Props) {
    const width = ref<number>(props.width);
    const height = ref<number>(props.height);
    const src = ref<string>(props.src);
    const count = ref<number>(props.badgeCount);
    watchEffect(() => {
      count.value = props.badgeCount;
    });
    return {
      width,
      height,
      src,
      count,
    };
  },
};
</script>

<style lang="less" scoped>
.avatar {
  float: left;
  img {
    border-radius: 6px;
  }
}
</style>
