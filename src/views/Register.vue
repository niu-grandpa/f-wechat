<template>
  <Form title="FWeChat号注册">
    <RegForm @on-reg="onRegister" />
  </Form>
</template>

<script lang="ts">
import { computed } from "vue";
import router from "../router";
import Form from "comps/Form.vue";
import RegForm from "comps/RegForm.vue";
import { Toast } from "vant";

const prefixCls = "fwechat";

export default {
  components: {
    Form,
    RegForm,
  },
  setup() {
    const wrapperClass = computed(() => `${prefixCls}-register`);

    const onRegister = () => {
      Toast({
        type: "success",
        message: "注册成功",
        onClose: () => router.replace("/login"),
      });
    };

    return {
      wrapperClass,
      onRegister,
    };
  },
};
</script>

<style lang="less" scoped></style>
