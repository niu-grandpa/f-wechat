<template>
  <van-index-bar :sticky="false">
    <template v-for="n in list" :key="n.index">
      <van-index-anchor :index="n.index" />
      <template v-for="x in n.info" :key="x.name">
        <van-cell :title="x.name">
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
import { Toast } from "vant";
import Avatar from "comps/Avatar.vue";

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
  },
  setup() {
    const list = ref<List[]>();

    getList(list);

    return {
      list,
    };
  },
};
</script>
