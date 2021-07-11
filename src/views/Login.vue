<template>
  <Form title="FWeChat号登录">
    <LoginForm @on-submit="onSubmit" />
  </Form>
</template>

<script lang="ts">
import { ref } from "vue";
import router from "../router";
import { Dialog } from "vant";
import Form from "comps/Form.vue";
import LoginForm from "comps/LoginForm.vue";

interface UserInfo {
  user: string;
  pw: string;
}

export default {
  components: {
    Form,
    LoginForm,
  },
  setup() {
    const onSubmit = (values: UserInfo) => {
      const { user, pw } = values;
      const userName = localStorage.getItem(user);
      const password = localStorage.getItem(pw);

      if (userName && password) {
        router.replace({ name: "chats", params: { username: userName } });
      } else {
        Dialog.alert({
          message: "帐号密码不存在或未注册",
        });
      }
    };

    return {
      onSubmit,
    };
  },
};
</script>
