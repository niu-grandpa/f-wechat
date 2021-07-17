<template>
  <Transition name="van-slide-right" v-show="show">
    <section :class="wrapperClass">
      <van-nav-bar
        :title="$route.params.user"
        fixed
        left-arrow
        @click-left=""
        @click-right=""
      >
        <template #right>
          <van-icon name="ellipsis" />
        </template>
      </van-nav-bar>
      <div :class="contentClass"></div>
      <div :class="footerClass">
        <van-row justify="space-between">
          <van-col span="2">
            <van-icon name="volume-o" />
          </van-col>
          <van-col span="16">
            <van-field />
          </van-col>
          <van-col span="6">
            <van-icon name="smile-o" />
            <van-button type="success">发送</van-button>
          </van-col>
        </van-row>
      </div>
    </section>
  </Transition>
</template>

<script lang="ts">
import { computed, ref } from "vue";

const prefixCls = "fwechat";

export default {
  setup() {
    const wrapperClass = computed(() => `${prefixCls}-chat-window`);
    const contentClass = computed(() => `${prefixCls}-chat-window-content`);
    const footerClass = computed(() => `${prefixCls}-chat-window-footer`);

    const show = ref<boolean>(false);

    setTimeout(() => (show.value = true), 0);

    return {
      wrapperClass,
      contentClass,
      footerClass,
      show,
    };
  },
};
</script>

<style lang="less">
.fwechat {
  &-chat-window {
    width: 100%;
    height: calc(100vh);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    overflow: auto;
    background-color: #efefef;

    .van-nav-bar {
      background-color: #efefef;
      .van-icon {
        color: inherit;
      }
    }

    .van-hairline--bottom::after {
      border-color: #dcdee2;
    }

    &-content {
      width: 100%;
      height: calc(100vh - 3rem);
      position: absolute;
      top: 3rem;
      left: 0;
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
          border-radius: 4px;
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
}
</style>
