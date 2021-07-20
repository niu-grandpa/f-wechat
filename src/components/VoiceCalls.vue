<template>
  <Transition name="van-fade">
    <section v-if="show" :class="wrapperClass">
      <figure :class="figureClass">
        <Avatar :src="$route.params.src" :width="74" :height="72" />
        <h3>{{ $route.params.name }}</h3>
        <small>正在邀请对方接受邀请..</small>
      </figure>
      <div :class="footerClass">
        <ul>
          <li>
            <div :tabindex="0" :class="[roundClass, microphone]"></div>
            <small>麦克风已开</small>
          </li>
          <li>
            <div
              :tabindex="0"
              :class="[roundClass, cancelClass, phone]"
              @click="handleCancel"
            ></div>
            <small>取消</small>
          </li>
          <li>
            <div :tabindex="0" :class="[roundClass, speaker]"></div>
            <small>扬声器已开</small>
          </li>
        </ul>
      </div>
      <audio autoplay loop src="/src/assets/微信铃声.mp3" />
    </section>
  </Transition>
</template>

<script lang="ts">
import { reactive, computed, toRefs } from "vue";
import Avatar from "./Avatar.vue";

interface State {
  show: boolean;
  wrapperClass: string;
  figureClass: string;
  footerClass: string;
  roundClass: string;
  cancelClass: string;
  microphone: string;
  phone: string;
  speaker: string;
}

const prefixCls = "fwechat";

export default {
  components: {
    Avatar,
  },
  setup() {
    const state: State = reactive({
      show: false,
      wrapperClass: computed(() => `${prefixCls}-voice-calls`),
      figureClass: computed(() => `${prefixCls}-voice-calls-figure`),
      footerClass: computed(() => `${prefixCls}-voice-calls-footer`),
      roundClass: computed(() => `${prefixCls}-voice-calls-round-btn`),
      cancelClass: computed(() => `${prefixCls}-voice-calls-round-btn-cancel`),
      microphone: computed(() => `${prefixCls}-voice-calls-microphone`),
      phone: computed(() => `${prefixCls}-voice-calls-phone`),
      speaker: computed(() => `${prefixCls}-voice-calls-speaker`),
    });

    setTimeout(() => (state.show = true), 0);

    const handleCancel = () => {
      state.show = false;
    };

    return {
      ...toRefs(state),
      handleCancel,
    };
  },
};
</script>

<style lang="less" scoped>
.fwechat {
  &-voice-calls {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1300;
    color: #fff;
    background: url("@/assets/home-bg2.jpg") no-repeat fixed;

    &:after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      background: inherit;
      filter: blur(25px);
    }

    &-figure {
      margin: 4.375rem 0;
      text-align: center;
      .avatar {
        float: none;
        margin-bottom: 1rem;
      }
      h3 {
        margin-bottom: 0.25rem;
      }
    }

    &-footer {
      width: 100%;
      height: 7.5rem;
      padding: 1.5rem;
      text-align: center;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 3;

      ul li {
        display: inline-block;
        small {
          display: block;
          margin-top: 0.5rem;
        }
      }
    }

    &-round-btn {
      width: 60px;
      height: 60px;
      margin: 0 1.4rem;
      border-radius: 100px;
      background-color: #fff;
      background-size: 42%;
      background-repeat: no-repeat;
      background-position: 50%;

      &:active {
        background-color: rgba(255, 255, 255, 0.2);
      }

      &-cancel {
        background-color: #ff4d4f;
        background-size: 50%;
      }
    }

    &-microphone {
      background-image: url("@/assets/麦克风.png");
    }
    &-phone {
      background-image: url("@/assets/挂断.png");
    }
    &-speaker {
      background-image: url("@/assets/扬声器.png");
    }
  }
}
</style>
