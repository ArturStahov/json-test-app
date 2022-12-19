<template lang="pug">
.auth-form
  v-card.mx-auto
    template(v-slot:title) {{ formTitle }}
    v-card-text 
      v-form
        TextInput(v-for='(field, idx) in fields', :key='idx', :fieldConfig='field')
</template>

<script lang="ts">
import { authActions } from '@/constants/auth';
import { defineComponent } from 'vue';
import { IAuthPayload, typesAction } from '../../interfaces/auth.interface';
import TextInput from '../Fields/TextInput.vue';

export default defineComponent({
  name: 'AuthForm',
  components: { TextInput },
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data: () => ({}),

  computed: {
    formTitle() {
      return this.config.action === authActions.LOGIN ? ':login:' : ':registration:new:user';
    },
    fields() {
      return this.config.fields;
    },
  },
});
</script>

<style scoped lang="scss">
@import '../../style/theme.scss';
.auth-form {
  width: 400px;

  .text-input {
    margin-bottom: 20px;
  }

  :deep(.v-card) {
    border-top-left-radius: 72px;
    border-top-right-radius: 72px;
    .v-card-item {
      padding: 20px;
    }
    .v-card-title {
      @include font-settings(2rem, 1.2, 400, $color-green, $decor-font);
    }
    .v-card-text {
      padding: 20px;
    }
  }
}
</style>