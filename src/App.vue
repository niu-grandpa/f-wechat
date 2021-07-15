<template>
  <Header :class="hiddenClass" :title="title" />
  <section :class="contentClass">
    <Chats v-show="title === '微信'" />
    <Contacts v-show="title === '通讯录'" />
    <Discover v-show="title === '发现'" />
    <Me v-show="title === '我'" />
    <RouterView />
  </section>
  <Tabbar @on-change="onChange" />
</template>

<script lang="ts">
import { computed, reactive, toRefs } from "vue";
import Header from "comps/Header.vue";
import Tabbar from "comps/Tabbar.vue";
import Chats from "views/Chats.vue";
import Contacts from "views/Contacts.vue";
import Discover from "views/Discover.vue";
import Me from "views/Me.vue";

const prefixCls = "fwechat";

export default {
  components: {
    Header,
    Tabbar,
    Chats,
    Contacts,
    Discover,
    Me,
  },
  setup() {
    const state = reactive({
      title: "微信",
      showHeader: true,
    });
    const contentClass = computed(() => `${prefixCls}-content`);
    const hiddenClass = computed(() => ({ hidden: !state.showHeader }));

    const onChange = (cur: string) => {
      state.title = cur;
      state.showHeader = cur === "我" ? false : true;
    };

    return {
      ...toRefs(state),
      contentClass,
      hiddenClass,
      onChange,
    };
  },
};
</script>

<style lang="less">
@import "@/styles/base";

#app {
  overflow: hidden;
}

.fwechat {
  &-content {
    position: relative;
    height: calc(100vh - 6.7rem);
    overflow-y: auto;
    background-color: #eee;
  }
}

.hidden {
  visibility: hidden;
  z-index: -1;
}

.van-popover__action {
  width: auto;
}
.van-cell__left-icon {
  margin-right: 1rem;
}
</style>
