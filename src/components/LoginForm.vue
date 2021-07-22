<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset style="margin: 0">
      <van-field
        v-model="username"
        name="userName"
        label="帐号"
        placeholder="请填写FWeChat号"
        :rules="[{ pattern: /\d{8}/, required: true, message: 'FWeChat号不存在' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="请填写密码"
        :rules="[{ pattern: /\d{6}/, required: true, message: '无效的密码' }]"
      />
    </van-cell-group>
    <div style="margin-top: 26px">
      <van-button block type="success" native-type="submit">登录</van-button>
    </div>
  </van-form>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Dialog, Toast } from "vant";
import { getLocalItem } from "../utils";

interface UserInfo {
  userName: string;
  password: string;
}

export default {
  setup() {
    const router = useRouter();

    const username = ref<string>("");
    const password = ref<string>("");

    const onSubmit = (values: UserInfo) => {
      const { userName, password } = values;
      const un = getLocalItem("userName");
      const pw = getLocalItem("password");
      const nk = getLocalItem("nickName");

      if (un === userName && pw === password) {
        Toast.loading("登录中");
        setTimeout(() => {
          Toast.clear();
          router.replace({
            name: "chats",
            params: { nickName: nk!, username: userName },
          });
        }, 1000);
      } else {
        Dialog.alert({
          message: "帐号密码不存在或未注册",
        });
      }
    };

    return {
      username,
      password,
      onSubmit,
    };
  },
};
</script>
