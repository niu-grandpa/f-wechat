<template>
  <div class="divider-avatar">
    <span>{{ $props.user || $route.params.user }}</span>
    <Avatar :width="53" :height="50" :src="$props.src || $route.params.src" />
  </div>
</template>

<script lang="ts">
import Avatar from "comps/Avatar.vue";

export default {
  props: {
    user: {
      type: String,
      default: "",
    },
    src: {
      type: String,
      default: "",
    },
  },
  components: {
    Avatar,
  },
};
</script>

<style lang="less" scoped>
.divider-avatar {
  position: absolute;
  right: 1rem;
  bottom: -25px;

  .avatar {
    float: right;
  }

  > span {
    display: inline-block;
    margin-top: 0.3rem;
    margin-right: 0.8rem;
    color: #fff;
  }
}
</style>
