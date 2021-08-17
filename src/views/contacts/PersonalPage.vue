<template>
  <Transition name="van-slide-right" v-show="show">
    <section :class="wrapperClass">
      <div :class="topBoxClass">
        <van-icon name="arrow-left" @click="handleBack" />
        <DividerAvatar />
      </div>
      <div :class="bottomBoxClass"><hr /></div>
    </section>
  </Transition>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import DividerAvatar from "comps/DividerAvatar.vue";

const prefixCls = "fwechat";

export default {
  components: {
    DividerAvatar,
  },
  setup() {
    const router = useRouter();

    const show = ref<boolean>(false);
    setTimeout(() => (show.value = true), 0);

    const wrapperClass = computed(() => `${prefixCls}-personal`);
    const topBoxClass = computed(() => `${prefixCls}-personal-top`);
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
      bottomBoxClass,
      handleBack,
    };
  },
};
</script>

<style lang="less" scoped>
.fwechat {
  &-personal {
    display: flex;
    flex-direction: column;

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
  }
}
</style>
