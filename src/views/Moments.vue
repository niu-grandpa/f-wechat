<template>
  <Transition name="van-slide-right" v-show="show">
    <van-pull-refresh :class="wrapperClass" v-model="loading" @refresh="onRefresh">
      <van-icon :class="backIcon" name="arrow-left" @click="handleBack" />
      <div :class="topBoxClass">
        <DividerAvatar :user="userName" />
      </div>
      <div :class="bottomBoxClass">
        <lazy-component>
          <van-cell v-for="n in 100" clickable>
            <template #value>
              <Avatar :width="32" :height="32" />
              <div :class="infoBox">
                <h5></h5>
                <p></p>
              </div>
            </template>
          </van-cell>
        </lazy-component>
      </div>
    </van-pull-refresh>
  </Transition>
</template>

<script lang="ts">
import { reactive, computed, toRefs } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import DividerAvatar from "comps/DividerAvatar.vue";
import { getLocalItem } from "../utils";
import Avatar from "comps/Avatar.vue";

const prefixCls = "fwechat";

export default {
  components: {
    Avatar,
    DividerAvatar,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      show: false,
      loading: false,
      wrapperClass: computed(() => `${prefixCls}-moments`),
      backIcon: computed(() => `${prefixCls}-moments-back`),
      topBoxClass: computed(() => `${prefixCls}-moments-top-box`),
      bottomBoxClass: computed(() => `${prefixCls}-moments-bottom-box`),
      infoBox: computed(() => `${prefixCls}-moments-info-box`),
      userName: computed(() => getLocalItem("nickName")),
    });

    setTimeout(() => {
      state.show = true;
      state.loading = true;
    }, 0);
    setTimeout(() => (state.loading = false), 1000);

    const handleBack = () => {
      state.show = false;
      setTimeout(() => router.replace("/"), 300);
    };

    const onRefresh = () => {
      setTimeout(() => {
        Toast("刷新成功");
        state.loading = false;
      }, 1000);
    };

    return {
      ...toRefs(state),
      handleBack,
      onRefresh,
    };
  },
};
</script>

<style lang="less" scoped>
.fwechat {
  &-moments {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1250;
    overflow: auto;
    background-color: #fff;

    &-back {
      position: fixed;
      color: #fff;
      top: 15px;
      left: 15px;
      font-size: 1rem;
      z-index: 1;
    }

    &-top-box {
      position: relative;
      height: calc(100vh - 420px);
      background-image: url("@/assets/home-bg2.jpg");
      background-size: cover;
    }

    &-bottom-box {
      flex: 1;
      margin-top: 4rem;
    }

    &-info-box {
      margin-top: -0.6875rem;
      margin-left: 2.125rem;
      padding: 0.5rem;
    }
  }
}
</style>
