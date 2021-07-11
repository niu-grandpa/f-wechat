<template>
  <van-form @submit="handleClick">
    <van-cell-group inset style="margin: 0">
      <van-field
        v-model="username"
        name="user"
        label="帐号"
        placeholder="请填写FWeChat号"
        :rules="[{ required: true, message: '请填写FWeChat号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="pw"
        label="密码"
        placeholder="请填写密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin-top: 26px">
      <van-button
        block
        type="primary"
        native-type="submit"
        style="background: rgb(7, 193, 96); border-color: rgb(7, 193, 96)"
        >登录</van-button
      >
    </div>
  </van-form>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  emits: ["on-submit"],
  setup(prop: any, context: any) {
    const username = ref<string>("");
    const password = ref<string>("");

    const handleClick = (values: object) => {
      context.emit("on-submit", values);
    };

    return {
      username,
      password,
      handleClick,
    };
  },
};
</script>
