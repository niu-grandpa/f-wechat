<template>
  <transition name="van-slide-right">
    <section v-show="visible" :class="wrapperClass">
      <div :class="closeIconClass">
        <router-link to="/home"><van-icon name="arrow-left" /></router-link>
      </div>
      <div :class="loginBoxClass">
        <h2>FWeChat号登录</h2>
        <LoginForm @on-submit="onSubmit" />
      </div>
    </section>
  </transition>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import router from "../router";
import { Toast } from "vant";
import LoginForm from "comps/LoginForm.vue";

interface UserInfo {
  user: string;
  pw: string;
}

const prefixCls = "fwechat";

export default {
  components: {
    LoginForm,
  },
  setup() {
    const visible = ref<boolean>(false);
    setTimeout(() => (visible.value = true), 0);

    const wrapperClass = computed(() => `${prefixCls}-login-wrapper`);
    const closeIconClass = computed(() => `${prefixCls}-close`);
    const loginBoxClass = computed(() => `${prefixCls}-login-box`);

    const onSubmit = (values: UserInfo) => {
      const { user, pw } = values;
      const userName = localStorage.getItem(user);
      const password = localStorage.getItem(pw);

      if (userName && password) {
        visible.value = false;
        router.replace({ name: "chats", params: { username: userName } });
      } else {
        Toast({
          type: "fail",
          message: "帐号未注册",
        });
      }
    };

    return {
      visible,
      wrapperClass,
      closeIconClass,
      loginBoxClass,
      onSubmit,
    };
  },
};
</script>

<style lang="less" scoped>
.fwechat {
  &-login-wrapper {
    position: relative;
    padding: 8px;
  }
  &-close {
    height: 50px;
    .van-icon {
      font-size: 1.2rem;
    }
  }
  &-login-box {
    padding: 8px;
    h2 {
      font-weight: 500;
      margin-bottom: 26px;
    }
  }
}
</style>
