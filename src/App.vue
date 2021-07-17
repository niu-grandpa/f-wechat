<template>
  <Header :class="hiddenClass" :title="title" />
  <RouterView />
  <Main :active="title" />
  <Tabbar @on-change="onChange" />
</template>

<script lang="ts">
import { computed, ref } from "vue";
import Header from "comps/Header.vue";
import Main from "views/Main.vue";
import Tabbar from "comps/Tabbar.vue";

export default {
  components: {
    Header,
    Main,
    Tabbar,
  },
  setup() {
    const title = ref<string>("微信");
    const showHeader = ref<boolean>(true);

    const hiddenClass = computed(() => ({ hidden: !showHeader.value }));

    const onChange = (cur: string) => {
      title.value = cur;
      showHeader.value = cur === "我" ? false : true;
    };

    return {
      title,
      showHeader,
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
