<template>
  <Header :class="hiddenClass" :title="text" />
  <section :class="contentClass">
    <router-view />
  </section>
  <Tabbar :active="active" @on-change="onChange" />
</template>

<script lang="ts">
import { computed, ref, watchEffect } from "vue";
import { RouteRecordName, useRoute } from "vue-router";
import Header from "comps/Header.vue";
import Tabbar from "comps/Tabbar.vue";

type ActiveType = string | RouteRecordName | null | undefined;

const prefixCls = "fwechat";

export default {
  components: {
    Header,
    Tabbar,
  },
  setup() {
    const route = useRoute();

    const show = ref<boolean>(true);
    const active = ref<ActiveType>("");
    const text = ref<string>("微信");

    const contentClass = computed(() => `${prefixCls}-content`);
    const hiddenClass = computed(() => ({ hidden: !show.value }));

    const changeTitle = (key: ActiveType) => {
      const map = {
        chats: "微信",
        contacts: "通讯录",
        discover: "发现",
      };
      // @ts-ignore
      let title = map[key];
      text.value = title;
      // 当切换到 '我' 选项的时候隐藏头部标题栏
      if (!title) show.value = false;
      else show.value = true;
    };
    const onChange = (cur: string) => changeTitle(cur);

    watchEffect(() => {
      // @ts-ignore
      active.value = route.name;
      changeTitle(route.name);
    });

    return {
      show,
      text,
      active,
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
