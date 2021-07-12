<template>
  <Form title="FWeChat号登录">
    <LoginForm />
  </Form>
</template>

<script lang="ts">
import Form from "comps/Form.vue";
import LoginForm from "comps/LoginForm.vue";

export default {
  functional: true,
  components: {
    Form,
    LoginForm,
  },
};
</script>
