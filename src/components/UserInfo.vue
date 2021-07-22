<template>
  <div :class="avatarClass">
    <Avatar :src="imgSrc" :width="56" :height="56" />
    <div :class="infoBoxClass">
      <h3 :class="userNameClass">{{ userName }}</h3>
      <div :class="fwechatInfo">微信号: {{ fwechat }}</div>
      <div :class="fwechatInfo" v-if="$props.showCity">地区: 某省 某市</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import Avatar from "comps/Avatar.vue";

const prefixCls = "fwechat";

export default {
  components: {
    Avatar,
  },
  props: {
    showCity: {
      type: Boolean,
      default: false,
    },
    user: {
      type: [String, Array],
      default: localStorage.getItem("nickName")!,
    },
    fwechat: {
      type: [String, Number, Array],
      default: localStorage.getItem("userName")!,
    },
    src: {
      type: [String, Array],
      default: "https://img.yzcdn.cn/vant/cat.jpeg",
    },
  },
  setup(props: any) {
    const avatarClass = computed(() => `${prefixCls}-avatar`);
    const infoBoxClass = computed(() => `${prefixCls}-info`);
    const userNameClass = computed(() => `${prefixCls}-info-user`);
    const fwechatInfo = computed(() => `${prefixCls}-info-fwechat`);

    const imgSrc = props.src;
    const userName = props.user;
    const fwechat = props.fwechat;

    return {
      avatarClass,
      infoBoxClass,
      userNameClass,
      fwechatInfo,
      imgSrc,
      userName,
      fwechat,
    };
  },
};
</script>

<style lang="less" scoped>
.fwechat {
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
      margin-bottom: 0.5rem;
    }
    &-fwechat {
      font-size: 0.8rem;
      color: #808695;
    }
  }
}
</style>
