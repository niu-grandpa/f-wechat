<template>
  <section :class="contentClass">
    <Chats v-show="$props.active === '微信'" />
    <Contacts v-show="$props.active === '通讯录'" />
    <Discover v-show="$props.active === '发现'" />
    <Me v-show="$props.active === '我'" />
  </section>
</template>

<script lang="ts">
import { computed } from "vue";
import Chats from "../chats/Index.vue";
import Contacts from "../contacts/Index.vue";
import Discover from "../discover/Index.vue";
import Me from "../me/Index.vue";

const prefixCls = "fwechat";

export default {
  components: {
    Chats,
    Contacts,
    Discover,
    Me,
  },
  props: {
    active: String,
  },
  setup() {
    const contentClass = computed(() => `${prefixCls}-content`);
    return {
      contentClass,
    };
  },
};
</script>

<style lang="less" scoped>
.fwechat {
  &-content {
    position: relative;
    height: calc(100vh - 6rem);
    overflow-y: auto;
    background-color: #efefef;
  }
}
</style>
