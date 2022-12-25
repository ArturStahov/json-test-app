<template lang="pug">
.auth-form
  v-card.mx-auto
    template(v-slot:title) {{ formTitle }}
    v-card-text 
      v-form(@submit.prevent='handlerSubmit', ref='form')
        TextInput(
          v-for='(field, idx) in fields',
          :key='idx',
          :isPasswordField='isPasswordField(field)',
          :fieldConfig='field',
          :visibleCounter='visibleCounter(field)',
          @change-field='(value) => handlerChange({ value, code: field.code })'
        )
        v-btn.rounded-pill.btn-submit(color='#33a50e', type='submit') OK
</template>

<script lang="ts">
import { authActions } from '@/constants/auth';
import { codeFields } from '@/constants/fields';
import { defineComponent } from 'vue';
import { IField, typeCodeFields, rulesType } from '../../interfaces/auth.interface';
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

  data: () => ({
    submitPayload: {} as { [key: string]: string },
    passwordRules: [(v: string) => !!v, (v: string) => v && v.length > 8],
    emailRules: [(v: string) => !!v, (v: string) => /.+@.+\..+/.test(v)],
    inputFields: [] as IField[] | [],
  }),

  created() {
    this.inputFields = [...this.config.fields];
  },

  computed: {
    formTitle() {
      return this.config.action === authActions.LOGIN ? ':login:' : ':registration:new:user';
    },
    fields() {
      return this.inputFields;
    },
  },

  methods: {
    isPasswordField(field: IField) {
      return field.code === codeFields.PASSWORD || field.code === codeFields.REPASSWORD;
    },

    visibleCounter(field: IField) {
      return field.code === codeFields.EMAIL ? false : true;
    },

    getRules(field: IField) {
      const rules = {
        [`${codeFields.EMAIL}`]: this.emailRules,
        [`${codeFields.PASSWORD}`]: this.passwordRules,
      };
      return rules[field.code] as rulesType[];
    },

    handlerChange(payload: { value: string; code: typeCodeFields }) {
      this.submitPayload = {
        ...this.submitPayload,
        [`${payload.code}`]: payload.value,
      };
      console.log(this.submitPayload, 'this.submitPayload');
    },

    reset() {
      (this.$refs.form as any).reset();
    },

    validateForm() {
      let statuses: [] | boolean[] = [];
      this.inputFields.forEach((fieldConfig: IField) => {
        const fieldValue = this.submitPayload[fieldConfig.code];
        if (fieldConfig.required) {
          const validationRules = this.getRules(fieldConfig);
          const resultChecked = validationRules
            .map((rule: rulesType) => rule(fieldValue))
            .filter((status: boolean) => status === false);
          fieldConfig.validStatus = !resultChecked.length;
          statuses = [...statuses, ...resultChecked];
        }
      });
      return !!statuses.length;
    },

    handlerSubmit() {
      const isHaveError = this.validateForm();
      console.log(isHaveError);

      if (!isHaveError) {
        this.config.submitEvent(this.submitPayload);
        this.reset();
        console.log('submit');
      }
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
    overflow: visible;
    border-top-left-radius: 72px;
    border-top-right-radius: 72px;
    background: #ffef7c;
    border: 5px dotted $color-green;
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
  .btn-submit {
    width: 100px;
    height: 40px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    @include font-settings(1.6rem, 1.2, 400, $color-white, $decor-font);
  }
}
</style>