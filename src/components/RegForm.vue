<template>
  <van-form @failed="onFailed" @submit="handleClick">
    <van-cell-group inset style="margin: 0">
      <van-field
        v-model="nickName"
        name="nickName"
        label="昵称"
        placeholder="例如: 水哥"
        :rules="[{ validator: validatorNickName, message: '请输入昵称' }]"
      />
      <van-field
        v-model="userName"
        name="userName"
        label="帐号"
        placeholder="填写帐号"
        :rules="[{ validator: validatorUN, message: '请输入8位数字的帐号' }]"
      />
      <van-field
        v-model="password"
        name="password"
        label="密码"
        placeholder="填写密码"
        :rules="[{ validator: validatorPW, message: '请输入6位数字的密码' }]"
      />
    </van-cell-group>
    <div style="margin-top: 26px">
      <van-button block type="success" native-type="submit">提交</van-button>
    </div>
  </van-form>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import { Toast } from "vant";

export default {
  emits: ["on-reg"],
  setup(props: any, context: any) {
    const state = reactive({
      nickName: "",
      userName: "",
      password: "",
    });

    // 校验函数可以返回 Promise，实现异步校验
    const validatorNickName = (val: string) =>
      new Promise((resolve) => {
        Toast.loading("验证中...");
        setTimeout(() => {
          Toast.clear();
          resolve(val !== "");
        }, 1000);
      });

    const validatorUN = (val: string) =>
      new Promise((resolve) => {
        Toast.loading("验证中...");
        setTimeout(() => {
          Toast.clear();
          resolve(/\d{8}/.test(val));
        }, 1000);
      });

    const validatorPW = (val: string) =>
      new Promise((resolve) => {
        Toast.loading("验证中...");
        setTimeout(() => {
          Toast.clear();
          resolve(/\d{6}/.test(val));
        }, 1000);
      });

    const onFailed = () => {
      Toast({
        type: "fail",
        message: "注册失败",
      });
    };

    const handleClick = () => {
      context.emit("on-reg");
    };

    return {
      ...toRefs(state),
      onFailed,
      validatorNickName,
      validatorUN,
      validatorPW,
      handleClick,
    };
  },
};
</script>

<style lang="less" scoped></style>
