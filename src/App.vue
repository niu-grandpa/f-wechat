<template>
  <Header :class="hiddenClass" :title="text" />
  <section :class="contentClass">
    <router-view />
  </section>
  <Tabbar @on-change="onChange" />
</template>

<script lang="ts">
import { computed, ref } from "vue";
import Header from "comps/Header.vue";
import Tabbar from "comps/Tabbar.vue";

const prefixCls = "fwechat";

export default {
  components: {
    Header,
    Tabbar,
  },
  setup() {
    const show = ref<boolean>(true);
    const text = ref<string>("微信");

    const contentClass = computed(() => `${prefixCls}-content`);
    const hiddenClass = computed(() => ({ hidden: !show.value }));

    const title: string[] = ["微信", "通讯录", "发现"];

    const onChange = (index: number) => {
      text.value = title[index] || "";

      if (index === 3) show.value = false;
      else show.value = true;
    };

    return {
      show,
      text,
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
    background-color: #f8f8f9;
  }
}

.hidden {
  visibility: hidden;
  z-index: -1;
}

.van-popover__action {
  width: auto;
}
</style>
