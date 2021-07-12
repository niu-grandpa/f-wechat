<template>
  <van-form @failed="onFailed" @submit="onSubmit">
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
        :rules="[{ pattern: /\d{8}/, message: '请输入8位数字的帐号' }]"
      />
      <van-field
        v-model="password"
        name="password"
        label="密码"
        placeholder="填写密码"
        :rules="[{ pattern: /\d{6}/, message: '请输入6位数字的密码' }]"
      />
    </van-cell-group>
    <div style="margin-top: 26px">
      <van-button block type="success" native-type="submit">提交</van-button>
    </div>
  </van-form>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import router from "../router";
import { Toast } from "vant";

interface RegInfo {
  nickName: string;
  userName: string;
  password: string;
}

export default {
  setup(props: any, context: any) {
    const state: RegInfo = reactive({
      nickName: "",
      userName: "",
      password: "",
    });

    const validatorNickName = (val: string): boolean => val.length > 0;

    const onFailed = () => {
      Toast({
        type: "fail",
        message: "注册失败",
      });
    };

    const onSubmit = (values: RegInfo) => {
      Toast.loading("验证中");
      setTimeout(() => {
        for (const key in values) {
          // @ts-ignore
          localStorage.setItem(key, values[key]);
        }
        Toast({
          type: "success",
          message: "注册成功",
          onClose: () => {
            Toast.clear();
            router.replace("/user/login");
          },
        });
      }, 2000);
    };

    return {
      ...toRefs(state),
      onFailed,
      validatorNickName,
      onSubmit,
    };
  },
};
</script>

<style lang="less" scoped></style>
