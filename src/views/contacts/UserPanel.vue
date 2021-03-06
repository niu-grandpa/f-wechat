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
      <van-cell-group>
        <van-cell title="朋友权限" is-link />
        <van-cell title="标签" is-link />
        <van-cell title="朋友圈" is-link :style="cellStyle3" @click="handleEnter" />
      </van-cell-group>
      <Divider />
      <van-cell title="更多信息" is-link />
      <Divider />
      <div :tabindex="0" :class="footerClass" @click="handleSendMsg">
        <van-icon name="chat-o" /> <span>发消息</span>
      </div>
      <div :tabindex="0" :class="footerClass" @click="popup = true">
        <van-icon name="phone-circle-o" /> <span>音视频通话</span>
      </div>
    </section>
  </Transition>
  <div style="text-align: center">
    <van-popup
      v-model:show="popup"
      round
      position="bottom"
      :close-on-click-overlay="false"
    >
      <van-cell-group>
        <van-cell title="视频通话" clickable @click="handleShowCall('video')" />
        <van-cell title="语音通话" clickable @click="handleShowCall('voice')" />
      </van-cell-group>
      <Divider style="background-color: #efefef" />
      <van-cell title="取消" clickable @click="popup = false" />
    </van-popup>
  </div>
  <Component v-if="!popup" :is="compName" />
</template>

<script lang="ts">
import { computed, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import UserInfo from "../../components/UserInfo.vue";
import Divider from "../../components/Divider.vue";
import VoiceCalls from "../../components/VoiceCalls.vue";

interface State {
  show: boolean;
  popup: boolean;
  compName: string;
  wrapperClass: string;
  backClass: string;
  headerClass: string;
  footerClass: string;
  cellStyle3: {
    paddingTop: string;
    paddingBottom: string;
  };
}

const prefixCls = "fwechat";

export default {
  components: {
    UserInfo,
    Divider,
    VoiceCalls,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const state: State = reactive({
      show: false,
      popup: false,
      compName: "",
      wrapperClass: computed(() => `${prefixCls}-user-panel`),
      backClass: computed(() => `${prefixCls}-user-panel-back`),
      headerClass: computed(() => `${prefixCls}-user-panel-header`),
      footerClass: computed(() => `${prefixCls}-user-panel-footer`),
      cellStyle3: computed(() => ({ paddingTop: "1.375rem", paddingBottom: "1.375rem" })),
    });

    setTimeout(() => (state.show = true), 0);

    // 取10位随机数作为帐号展示
    const randomId = Math.ceil(Math.random() * 10000000000);

    const onBack = () => {
      state.show = false;
      // 返回上一级页面
      setTimeout(() => window.history.back(), 300);
    };

    // 进入好友个人主页
    const handleEnter = () => {
      router.push({
        name: "personalPage",
        params: {
          src: route.params.src,
          user: route.params.name,
        },
      });
    };
    // 进入聊天窗口
    const handleSendMsg = () => {
      router.replace({
        name: "chat",
        params: {
          friend: route.params.name,
          avatar: route.params.src,
        },
      });
    };
    // 显示语音通过拨打界面
    const handleShowCall = (type: "video" | "voice") => {
      // 异步渲染通话组件
      if (type === "voice") {
        state.compName = "VoiceCalls";
      } else {
        state.compName = "VideoCalls";
      }
      state.popup = false;
    };

    return {
      ...toRefs(state),
      onBack,
      randomId,
      handleEnter,
      handleSendMsg,
      handleShowCall,
    };
  },
};
</script>

<style lang="less" scoped>
.fwechat {
  &-user-panel {
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
