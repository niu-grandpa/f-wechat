<template>
  <Login />
  {{ a }}
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import Login from "views/Login.vue";

export default defineComponent({
  components: {
    Login,
  },
  setup() {
    const state = reactive({
      a: "a",
    });
    return state;
  },
});
</script>

<style lang="less">
@import "@/styles/base";
</style>
