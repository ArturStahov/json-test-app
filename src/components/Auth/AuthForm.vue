<template lang="pug">
.auth-form
  v-card.mx-auto
    template(v-slot:title) This is a title
      v-card-text This is content
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AuthForm',
  components: {},

  setup() {},
  computed: {},
});
</script>

<style scoped lang="scss">
.auth-form {
  width: 400px;
}
</style>