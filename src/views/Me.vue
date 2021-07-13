<template>
  <div :class="wrapperClass">
    <div :class="avatarClass">
      <Avatar :width="60" :height="60" />
      <div :class="infoBoxClass">
        <h3 :class="userNameClass">{{ userName }}</h3>
        <div :class="fwechatInfo">微信号: {{ fwechat }}</div>
      </div>
    </div>
    <Divider />
    <van-cell id="fwechat-cell" title="支付" is-link>
      <template #icon><van-icon color="#19be6b" name="certificate" /></template>
    </van-cell>
    <Divider />
    <van-cell id="fwechat-cell" title="收藏" is-link>
      <template #icon><van-icon color="#2db7f5" name="gem-o" /></template>
    </van-cell>
    <van-cell id="fwechat-cell" title="朋友圈" is-link>
      <template #icon><van-icon color="#2b85e4" name="photo-o" /></template>
    </van-cell>
    <van-cell id="fwechat-cell" title="卡包" is-link>
      <template #icon><van-icon color="#5cadff" name="peer-pay" /></template>
    </van-cell>
    <van-cell id="fwechat-cell" title="表情" is-link>
      <template #icon><van-icon color="#ff9900" name="smile-o" /></template>
    </van-cell>
    <Divider />
    <van-cell id="fwechat-cell" title="设置" is-link>
      <template #icon><van-icon color="#2d8cf0" name="setting-o" /></template>
    </van-cell>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import Avatar from "comps/Avatar.vue";
import Divider from "comps/Divider.vue";

const prefixCls = "fwechat";

export default {
  components: {
    Avatar,
    Divider,
  },
  setup() {
    const wrapperClass = computed(() => `${prefixCls}-me`);
    const avatarClass = computed(() => `${prefixCls}-me-avatar`);
    const infoBoxClass = computed(() => `${prefixCls}-me-info`);
    const userNameClass = computed(() => `${prefixCls}-me-info-user`);
    const fwechatInfo = computed(() => `${prefixCls}-me-info-fwechat`);

    const src = "https://img.yzcdn.cn/vant/cat.jpeg";
    const userName = localStorage.getItem("nickName")!;
    const fwechat = localStorage.getItem("userName")!;

    return {
      wrapperClass,
      avatarClass,
      infoBoxClass,
      userNameClass,
      fwechatInfo,
      src,
      userName,
      fwechat,
    };
  },
};
</script>

<style lang="less" scoped>
.fwechat {
  &-me {
    &-avatar {
      display: flex;
      padding: 1rem 1.2rem;
      background-color: #fff;
    }
    &-info {
      flex: 1;
      margin-left: 0.75rem;
      &-user {
        font-size: 1.1rem;
        margin-bottom: 0.7rem;
      }
      &-fwechat {
        font-size: 0.8rem;
        color: #808695;
      }
    }
  }
}
#fwechat-cell {
  i {
    margin-top: 0.15rem;
    margin-right: 1rem;
    font-size: 1.2rem;
  }
}
</style>
