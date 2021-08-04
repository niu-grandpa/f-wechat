<template>
  <Header :class="hiddenClass" :title="title" v-show="isUserPath" />
  <Main :active="title" v-if="isUserPath" />
  <RouterView />
  <Tabbar @on-change="onChange" />
</template>

<script lang="ts">
import { computed, defineAsyncComponent, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

// 当路由页面是首页或登录页时，这些组件都是不需要加载的
// 所以使用异步组件 + v-if 达到不加载不发送http请求的目的
const Header = defineAsyncComponent(() => import("comps/Header.vue"));
const Main = defineAsyncComponent(() => import("views/main/Index.vue"));
const Tabbar = defineAsyncComponent(() => import("comps/Tabbar.vue"));

export default {
  components: {
    Header,
    Main,
    Tabbar,
  },
  setup() {
    const route = useRoute();
    const title = ref<string>("微信");
    const showHeader = ref<boolean>(true);
    const isUserPath = ref<boolean>(false);
    const hiddenClass = computed(() => ({ hidden: !showHeader.value }));

    // 监听路由的变化决定是否加载组件
    watchEffect(() => {
      const loginPath = ["/home", "/user/login", "/user/register"];
      if (loginPath.includes(route.path)) {
        isUserPath.value = false;
      } else {
        isUserPath.value = true;
      }
    });

    const onChange = (cur: string) => {
      title.value = cur;
      showHeader.value = cur === "我" ? false : true;
    };

    return {
      title,
      showHeader,
      isUserPath,
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
