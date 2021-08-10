<template>
  <div :style="`${height}px`">
    <van-nav-bar
      :title="$props.title"
      fixed
      left-arrow
      @click-left="handleBack"
      @click-right="handleMore"
    >
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script lang="ts">
import { computed } from "@vue/runtime-core";

export default {
  props: {
    title: String,
  },
  emits: ["on-click-left", "on-click-right"],
  setup(prop: any, context: any) {
    const height = computed(() => 41);

    const handleBack = () => {
      context.emit("on-click-left");
    };

    const handleMore = () => {
      context.emit("on-click-right");
    };

    return {
      height,
      handleBack,
      handleMore,
    };
  },
};
</script>
