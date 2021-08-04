<template>
  <Transition name="van-slide-left">
    <div :class="wrapperClass">
      <van-cell
        center
        clickable
        v-for="(n, i) in list"
        :key="n.user"
        @click="handleClick(i)"
      >
        <template #value>
          <sup>{{ n.time }}</sup>
        </template>
        <template #title>
          <Avatar :src="n.src" :badge-count="n.count" />
          <div :class="infoClass">
            <h4>{{ n.user }}</h4>
            <small>{{ n.desc }}</small>
          </div>
        </template>
      </van-cell>
    </div>
  </Transition>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import Avatar from "comps/Avatar.vue";
import { getLocalItem, setLocalItem } from "../../utils";

interface List {
  src: string;
  user: string;
  desc: string;
  time: string;
  count: number;
  content: string;
}

const prefixCls = "fwechat";

async function getChatList<T>(list: T) {
  Toast.loading({
    message: "加载中...",
    forbidClick: true,
    duration: 0,
  });

  const response: Response = await fetch("/static/chat_list.json");
  // @ts-ignore
  list["value"] = await response.json();

  Toast.clear();
}

export default {
  components: {
    Avatar,
  },
  setup() {
    const router = useRouter();

    const wrapperClass = computed(() => `${prefixCls}-chats`);
    const infoClass = computed(() => `${prefixCls}-chats-info`);
    const MSG_SUM = computed(() => "msgSum");

    const list = ref<List[]>([]);
    const message = ref<number[]>([]);

    getChatList(list)
      .then(() => {
        list.value.forEach((l, i) => {
          // 每次重新进入时，从本地缓存中获取某条消息是否已被查阅过，如果是则取缓存值
          if (getLocalItem(`msg-${i}`)) {
            l.count = Number(getLocalItem(`msg-${i}`));
          }
          // 从本地获取用户的所有聊天记录
          // 如果有记录那么取最后一条消息作为展示
          if (getLocalItem(l.user)) {
            const chatRecord = JSON.parse(getLocalItem(l.user)!) as string[];
            const last = chatRecord.length - 1;
            l.desc = chatRecord[last];
          }
          if (l.count > 0) {
            message.value.push(l.count);
          }
        });
      })
      .then(() => setLocalItem(MSG_SUM.value, `${message.value.length}`));

    // 点击消息列表进入聊天窗口
    // 如果有消息计数提示则置零，标题消息总数减1，并保留到缓存中，以便下一次同步
    const handleClick = (idx: number) => {
      if (list.value[idx].count > 0) {
        setLocalItem(MSG_SUM.value, `${(message.value.length -= 1)}`);
      }

      list.value[idx].count = 0;
      setLocalItem(`msg-${idx}`, "0");

      // 通过路由携带当前聊天对象的信息到聊天窗口
      router.push({
        name: "chat",
        params: {
          avatar: list.value[idx].src,
          friend: list.value[idx].user,
          time: list.value[idx].time,
          content: list.value[idx].content,
        },
      });
    };

    return {
      wrapperClass,
      infoClass,
      list,
      handleClick,
    };
  },
};
</script>

<style lang="less" scoped>
.fwechat {
  &-chats {
    .van-cell--center {
      align-items: flex-start;
    }

    &-info {
      width: 100%;
      margin-left: 3.5rem;
      h4 {
        font-family: Arial, Helvetica, sans-serif;
      }
      small {
        font-size: 0.25rem;
        color: #808695;
      }
    }
  }
}
</style>
