<template>
  <div :class="wrapperClass">
    <van-cell title="朋友圈" to="/user/moments" :icon="pyqImg" is-link />
    <Divider />
    <van-cell title="扫一扫" :icon="scan" is-link />
    <Divider />
    <van-cell title="看一看" :icon="look" is-link />
    <van-cell title="搜一搜" :icon="search" is-link />
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import Divider from "comps/Divider.vue";
import PYQIcon from "@/assets/微信朋友圈.png";
import SouIcon from "@/assets/搜一搜.png";
import ScanIcon from "@/assets/扫一扫.png";
import LookIcon from "@/assets/看一看.png";

const prefixCls = "fwechat";

export default {
  components: {
    Divider,
  },
  setup() {
    const wrapperClass = computed(() => `${prefixCls}-discover`);
    const dividerClass = computed(() => `${prefixCls}-divider`);

    return {
      wrapperClass,
      dividerClass,
      pyqImg: PYQIcon,
      search: SouIcon,
      scan: ScanIcon,
      look: LookIcon,
    };
  },
};
</script>
