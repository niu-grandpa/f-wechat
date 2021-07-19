<template>
  <Transition name="van-slide-right" v-show="show">
    <section :class="wrapperClass">
      <div :class="backClass" @click="onBack"><van-icon name="arrow-left" /></div>
      <div :class="headerClass">
        <UserInfo
          :user="$route.params.name"
          :fwechat="randomId"
          :src="$route.params.src"
          show-city
        />
      </div>
      <Divider />
      <van-cell title="更多信息" is-link />
      <Divider />
      <div :tabindex="0" :class="footerClass">
        <van-icon name="chat-o" /> <span>发消息</span>
      </div>
    </section>
  </Transition>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from "vue";
import UserInfo from "../components/UserInfo.vue";
import Divider from "../components/Divider.vue";

const prefixCls = "fwechat";

export default {
  components: {
    UserInfo,
    Divider,
  },
  setup() {
    const state = reactive({
      show: false,
      wrapperClass: computed(() => `${prefixCls}-user-panel`),
      backClass: computed(() => `${prefixCls}-user-panel-back`),
      headerClass: computed(() => `${prefixCls}-user-panel-header`),
      footerClass: computed(() => `${prefixCls}-user-panel-footer`),
    });

    setTimeout(() => (state.show = true), 0);

    // 取10位随机数作为帐号展示
    const randomId = Math.ceil(Math.random() * 10000000000);

    const onBack = () => {
      state.show = false;
      // 返回上一级页面
      setTimeout(() => window.history.back(), 300);
    };

    return {
      ...toRefs(state),
      onBack,
      randomId,
    };
  },
};
</script>

<style lang="less" scoped>
.fwechat {
  &-user-panel {
    width: 100%;
    height: calc(100vh);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1200;
    background-color: #efefef;
    overflow: hidden;

    &-back {
      font-size: 1rem;
    }

    &-back,
    &-header {
      padding: 0.8rem;
      background-color: #fff;
    }

    &-header {
      .fwechat-avatar {
        padding: 0;
      }
    }

    &-footer {
      padding: 0.7rem;
      border-top: 1px solid #e8eaec;
      text-align: center;
      cursor: pointer;
      background-color: #fff;
      color: #105197;

      &:active {
        background-color: #f2f3f5;
      }

      i {
        font-size: 1.2rem;
      }
    }
  }
}
</style>
