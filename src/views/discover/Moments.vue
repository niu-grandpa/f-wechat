<template>
  <Transition name="van-slide-right" v-show="show">
    <van-pull-refresh :class="wrapperClass" v-model="loading" @refresh="onRefresh">
      <van-icon :class="backIcon" name="arrow-left" @click="handleBack" />
      <div :class="topBoxClass">
        <DividerAvatar :user="userName" />
      </div>
      <div :class="bottomBoxClass">
        <lazy-component>
          <van-cell v-for="info in infoList" clickable>
            <template #value>
              <Avatar :width="35" :height="35" :src="info.src" />
              <div :class="infoBox">
                <h5>{{ info.user }}</h5>
                <p v-if="info.postedContent">{{ info.postedContent }}</p>
                <img
                  v-if="info.postedImg"
                  style="object-fit: cover"
                  :src="info.postedImg"
                  alt="image"
                  width="200"
                  height="140"
                />
              </div>
            </template>
          </van-cell>
        </lazy-component>
      </div>
    </van-pull-refresh>
  </Transition>
</template>

<script lang="ts">
import { reactive, computed, toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import DividerAvatar from "comps/DividerAvatar.vue";
import { getLocalItem } from "../../utils";
import Avatar from "comps/Avatar.vue";

interface State {
  show: boolean;
  loading: boolean;
  wrapperClass: string;
  backIcon: string;
  topBoxClass: string;
  bottomBoxClass: string;
  infoBox: string;
  userName: string | null;
}

interface List {
  src: string;
  user: string;
  postedImg: string;
  postedContent: string;
}

const prefixCls = "fwechat";

async function getData(d: any) {
  const response: Response = await fetch("/static/chat_list.json");
  d.value = await response.json();
}

export default {
  components: {
    Avatar,
    DividerAvatar,
  },
  setup() {
    const router = useRouter();
    const state: State = reactive({
      show: false,
      loading: false,
      wrapperClass: computed(() => `${prefixCls}-moments`),
      backIcon: computed(() => `${prefixCls}-moments-back`),
      topBoxClass: computed(() => `${prefixCls}-moments-top-box`),
      bottomBoxClass: computed(() => `${prefixCls}-moments-bottom-box`),
      infoBox: computed(() => `${prefixCls}-moments-info-box`),
      userName: computed(() => getLocalItem("nickName")),
    });
    const infoList = ref<List[]>([]);

    setTimeout(() => {
      state.show = true;
      state.loading = true;
    }, 0);

    getData(infoList).then(() => {
      setTimeout(() => {
        state.loading = false;
      }, 500);
    });

    const handleBack = () => {
      state.show = false;
      setTimeout(() => router.replace("/"), 300);
    };

    const onRefresh = () => {
      getData(infoList).then(() => {
        Toast("刷新成功");
        state.loading = false;
      });
    };

    return {
      ...toRefs(state),
      infoList,
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
      margin-top: -0.75rem;
      margin-left: 2.125rem;
      padding: 0.5rem;

      h5 {
        color: #17233d;
        font-size: 0.85rem;

        & + img {
          margin-top: 0.5rem;
        }
      }

      p {
        margin-bottom: 0.5rem;
        font-size: 0.85rem;
      }
    }
  }
}
</style>
