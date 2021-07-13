<template>
  <div class="avatar">
    <img :width="width" :height="height" :src="src" alt="avatar" />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

interface Props {
  width: number;
  height: number;
  src: string;
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
  },
  setup(props: Props) {
    const width = ref<number>(props.width);
    const height = ref<number>(props.height);
    const src = ref<string>(props.src);

    return {
      width,
      height,
      src,
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
