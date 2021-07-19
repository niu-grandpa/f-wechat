<template>
  <van-index-bar :sticky="false">
    <template v-for="(n, i) in list" :key="n.index">
      <van-index-anchor :index="n.index" />
      <template v-for="(x, j) in n.info" :key="x.name">
        <van-cell :title="x.name" clickable @click="handleClick(i, j)">
          <template #icon>
            <Avatar :width="32" :height="32" :src="x.src" style="margin-right: 1rem" />
          </template>
        </van-cell>
      </template>
    </template>
  </van-index-bar>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import Avatar from "comps/Avatar.vue";
import Divider from "../components/Divider.vue";

interface List {
  index: string;
  info: [{ name: string; src: string }];
}

async function getList(list: any) {
  Toast.loading({
    message: "加载中...",
    duration: 0,
  });
  const res = await fetch("/static/contacts.json");
  list.value = await res.json();
  Toast.clear();
}

export default {
  components: {
    Avatar,
    Divider,
  },
  setup() {
    const router = useRouter();
    const list = ref<List[]>([]);

    getList(list);

    const handleClick = (i: number, j: number) => {
      router.push({
        name: "userPanel",
        params: {
          name: list.value[i].info[j].name,
          src: list.value[i].info[j].src,
        },
      });
    };

    return {
      list,
      handleClick,
    };
  },
};
</script>
