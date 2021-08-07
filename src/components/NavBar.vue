<template>
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
</template>

<script lang="ts">
export default {
  props: {
    title: String,
  },
  emits: ["on-click-left", "on-click-right"],
  setup(prop: any, context: any) {
    const handleBack = () => {
      context.emit("on-click-left");
    };

    const handleMore = () => {
      context.emit("on-click-right");
    };

    return {
      handleBack,
      handleMore,
    };
  },
};
</script>
