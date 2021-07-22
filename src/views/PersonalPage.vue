<template>
  <Transition name="van-slide-right" v-show="show">
    <section :class="wrapperClass">
      <div :class="topBoxClass">
        <van-icon name="arrow-left" @click="handleBack" />
        <div :class="infoClass">
          <span>{{ $route.params.user }}</span>
          <Avatar :width="53" :height="50" :src="$route.params.src" />
        </div>
      </div>
      <div :class="bottomBoxClass"><hr /></div>
    </section>
  </Transition>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import Avatar from "../components/Avatar.vue";

const prefixCls = "fwechat";

export default {
  components: {
    Avatar,
  },
  setup() {
    const router = useRouter();

    const show = ref<boolean>(false);
    setTimeout(() => (show.value = true), 0);

    const wrapperClass = computed(() => `${prefixCls}-personal`);
    const topBoxClass = computed(() => `${prefixCls}-personal-top`);
    const infoClass = computed(() => `${prefixCls}-personal-info`);
    const bottomBoxClass = computed(() => `${prefixCls}-personal-bottom`);

    const handleBack = () => {
      show.value = false;
      setTimeout(() => {
        router.push("/");
      }, 300);
    };

    return {
      show,
      wrapperClass,
      topBoxClass,
      infoClass,
      bottomBoxClass,
      handleBack,
    };
  },
};
</script>

<style lang="less" scoped>
.fwechat {
  &-personal {
    width: 100%;
    height: calc(100vh);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1250;

    &-top {
      height: 30%;
      position: relative;
      background: url("@/assets/personal-page-bg.jpg");
      background-size: cover;

      .van-icon-arrow-left {
        margin-top: 1rem;
        margin-left: 0.5rem;
        font-size: 1.1rem;
        color: #fff;
      }
    }

    &-bottom {
      flex: 1;
      background-color: #fff;

      hr {
        width: 80%;
        margin: 6rem auto;
      }
    }

    &-info {
      position: absolute;
      right: 1rem;
      bottom: -25px;

      .avatar {
        float: right;
      }

      > span {
        display: inline-block;
        margin-top: 0.3rem;
        margin-right: 0.8rem;
        color: #fff;
      }
    }
  }
}
</style>
