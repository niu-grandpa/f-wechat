<template>
  <Transition name="van-slide-right" v-show="show">
    <section :class="wrapperClass">
      <div style="height: 3.5rem">
        <NavBar
          :title="friend"
          @on-click-left="handleBack"
          @on-click-right="handleMore"
        />
      </div>

      <div :class="contentClass">
        <ul>
          <li :class="friendMsg">
            <Avatar :src="avatar" :width="36" :height="36" />
            <div :class="msgContent">{{ message || "你好呀~" }}</div>
          </li>
          <template v-if="content.length">
            <li :class="userMsg" v-for="c in content" :key="c">
              <Avatar :width="36" :height="36" />
              <div :class="msgContent">{{ c }}</div>
            </li>
          </template>
        </ul>
      </div>

      <div :class="footerClass">
        <van-row justify="space-between">
          <van-col span="2">
            <van-icon name="volume-o" />
          </van-col>
          <van-col span="16">
            <van-field v-model="inputVal" @keydown.stop="handleEnterKey($event)" />
          </van-col>
          <van-col span="6">
            <van-icon name="smile-o" />
            <van-button type="success" @click="handleSend">发送</van-button>
          </van-col>
        </van-row>
      </div>
    </section>
  </Transition>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import Avatar from "comps/Avatar.vue";
import NavBar from "comps/Navbar.vue";
import { getLocalItem, setLocalItem } from "../../utils";
import { Toast } from "vant";

interface State {
  show: boolean;
  time: string | string[];
  avatar: string | string[];
  friend: string | string[];
  message: string | string[];
  inputVal: string;
  content: string[];
  wrapperClass: string;
  contentClass: string;
  footerClass: string;
  userMsg: string;
  friendMsg: string;
  msgTime: string;
  msgContent: string;
}

const prefixCls = "fwechat";

export default {
  components: {
    Avatar,
    NavBar,
  },
  setup() {
    const route = useRoute();

    const state: State = reactive({
      show: false,
      time: route.params.time,
      avatar: route.params.avatar,
      friend: route.params.friend,
      message: route.params.content,
      inputVal: "",
      content: [],
      wrapperClass: computed(() => `${prefixCls}-chat-window`),
      contentClass: computed(() => `${prefixCls}-chat-window-content`),
      footerClass: computed(() => `${prefixCls}-chat-window-footer`),
      userMsg: computed(() => `${prefixCls}-chat-user-msg`),
      friendMsg: computed(() => `${prefixCls}-chat-friend-msg`),
      msgTime: computed(() => `${prefixCls}-chat-time`),
      msgContent: computed(() => `${prefixCls}-chat-content`),
    });

    setTimeout(() => (state.show = true), 0);

    // 获取本地是否有当前对象的聊天记录
    state.content = JSON.parse(getLocalItem(`${state.friend}`)!) || [];

    const handleSend = () => {
      if (state.inputVal !== "") {
        state.content.push(state.inputVal);
        state.inputVal = "";
      } else {
        Toast("不能发送空白消息");
      }
    };

    const handleEnterKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSend();
      }
    };

    const handleBack = () => {
      state.show = false;
      // 返回上一级页面
      setTimeout(() => window.history.back(), 300);
      // 再返回的时候统一设置所有发送的消息到本地缓存中
      // key值为聊天的对象名
      if (state.content.length > 0) {
        setLocalItem(`${state.friend}`, JSON.stringify(state.content));
      }
    };

    const handleMore = () => {};

    return {
      ...toRefs(state),
      handleSend,
      handleBack,
      handleMore,
      handleEnterKey,
    };
  },
};
</script>

<style lang="less">
.fwechat {
  &-chat-window {
    .van-nav-bar {
      background-color: #efefef;
    }

    .van-hairline--bottom::after {
      border-color: #dcdee2;
    }

    &-content {
      width: 100%;
      max-height: 35rem;
      overflow-y: auto;
    }

    &-footer {
      width: 100%;
      height: 3rem;
      padding: 8px;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #f8f8f9;
      border-top: 1px solid #e8eaec;

      .van-row {
        align-items: center;

        .van-field {
          height: 2rem;
          top: -2px;
          padding: 0;
          border-radius: 0.25rem;
          .van-field__control {
            height: 2rem;
            padding-left: 6px;
            padding-right: 6px;
          }
        }

        .van-col {
          &--2,
          &--6 {
            display: flex;
            align-items: center;
            justify-content: unset;
          }
          &--2 {
            i {
              font-size: 1.3rem;
            }
          }
          &--6 {
            i {
              margin: 0 0.3125rem;
              font-size: 1.6rem;
            }
            .van-button--success {
              padding: 0.75rem;
              height: 1.5rem;
              font-size: 0.875rem;
            }
          }
        }
      }
    }
  }

  &-chat {
    &-user-msg,
    &-friend-msg {
      display: flex;
      margin: 0.8rem 0;
      .fwechat-chat-content {
        max-width: 15.625rem;
        display: inline-flex;
        align-items: center;
        padding: 0.5rem 0.8rem;
        border-radius: 0.375rem;
        position: relative;
        word-break: break-all;
        white-space: normal;
      }
    }

    &-user-msg {
      flex-direction: row-reverse;
      padding-right: 0.875rem;
      .fwechat-chat-content {
        margin-right: 0.8rem;
        background-color: #95ee70;
        &::after {
          content: "";
          position: absolute;
          top: 0.75rem;
          right: -0.25rem;
          width: 0.5rem;
          height: 0.5rem;
          margin-top: -0.25rem;
          background: inherit;
          transform: rotate(45deg);
        }
      }
    }

    &-friend-msg {
      padding-left: 0.875rem;
      .fwechat-chat-content {
        margin-left: 0.8rem;
        background-color: #ffffff;
        &::before {
          content: "";
          position: absolute;
          top: 0.75rem;
          left: -0.25rem;
          width: 0.5rem;
          height: 0.5rem;
          margin-top: -0.25rem;
          background: inherit;
          transform: rotate(45deg);
        }
      }
    }

    &-time {
      display: block;
      color: #808695;
      text-align: center;
    }
  }
}
</style>
