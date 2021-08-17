<template>
  <Transition name="van-slide-right" v-show="show">
    <section :class="wrapperClass">
      <NavBar title="设置" :show-right="false" @on-click-left="onBack" />
      <van-cell title="帐号与安全" is-link />
      <van-cell title="青少年模式" is-link value="未开启" />
      <Divider />
      <van-cell title="新消息通知" is-link />
      <van-cell title="勿扰模式" is-link />
      <van-cell title="聊天" is-link />
      <van-cell title="隐私" is-link />
      <van-cell title="通用" is-link />
      <Divider />
      <van-cell title="关于微信" is-link />
      <van-cell title="帮助与反馈" is-link />
      <Divider />
      <van-cell title="插件" is-link />
      <Divider />
      <van-cell class="center" title="切换帐号" clickable />
      <Divider />
      <van-cell class="center" title="退出" clickable @click="handleQuit" />
    </section>
  </Transition>
  <div style="text-align: center">
    <van-popup v-model:show="visible" round position="bottom">
      <van-cell-group>
        <van-cell title="退出登录" clickable @click="onSignOut" />
        <van-cell title="关闭微信" clickable @click="onClose" />
      </van-cell-group>
      <Divider style="background-color: #efefef" />
      <van-cell title="取消" clickable @click="visible = false" />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Dialog, Toast } from "vant";
import NavBar from "comps/NavBar.vue";
import Divider from "comps/Divider.vue";

const prefixCls = "fwechat";

export default {
  components: {
    NavBar,
    Divider,
  },
  setup() {
    const router = useRouter();

    const show = ref<boolean>(false);
    setTimeout(() => (show.value = true), 0);

    const wrapperClass = computed(() => `${prefixCls}-setting`);

    const visible = ref<boolean>(false);

    const onBack = () => {
      show.value = false;
      setTimeout(() => window.history.back(), 300);
    };

    const handleQuit = () => {
      visible.value = true;
    };

    const onSignOut = () => {
      visible.value = false;
      Toast.loading({
        message: "退出中...",
        forbidClick: true,
        onClose: () => {
          router.replace("/home");
        },
      });
    };

    const onClose = () => {
      visible.value = false;
      Dialog.confirm({
        message: "关闭后，你的朋友可能无法及时联系上你，还可能会影响到微信的使用体验",
        confirmButtonText: "关闭微信",
        confirmButtonColor: "#1989fa",
      }).then(() => {
        // @ts-ignore
        window.open("about:blank", "_self").close();
      });
    };

    return {
      show,
      visible,
      wrapperClass,
      onBack,
      handleQuit,
      onSignOut,
      onClose,
    };
  },
};
</script>

<style lang="less" scoped>
.fwechat {
  &-setting {
    .center {
      text-align: center;
    }
  }
}
</style>
