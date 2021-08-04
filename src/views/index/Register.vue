<template>
  <Form title="FWeChat号注册">
    <RegForm />
  </Form>
</template>

<script lang="ts">
import Form from "comps/Form.vue";
import RegForm from "comps/RegForm.vue";

export default {
  functional: true,
  components: {
    Form,
    RegForm,
  },
};
</script>
