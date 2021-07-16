<template>
  <section :class="contentClass">
    <Chats v-show="$props.active === '微信'" />
    <Contacts v-show="$props.active === '通讯录'" />
    <Discover v-show="$props.active === '发现'" />
    <Me v-show="$props.active === '我'" />
    <router-view />
  </section>
</template>

<script lang="ts">
import { computed } from "vue";
import Chats from "./Chats.vue";
import Contacts from "./Contacts.vue";
import Discover from "./Discover.vue";
import Me from "./Me.vue";

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
