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
import { IField, typeCodeFields, typeValidationItem, IFormSubmitPayload } from '../../interfaces/auth.interface';
import TextInput from '../Fields/TextInput.vue';
import { validateForm } from '../../services/auth.service';

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
    submitPayload: {} as IFormSubmitPayload,
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

    handlerChange(payload: { value: string; code: typeCodeFields }) {
      this.submitPayload = {
        ...this.submitPayload,
        [`${payload.code}`]: payload.value,
      };
    },

    reset() {
      (this.$refs.form as any).reset();
    },

    setValidation(validationStatuses: [] | typeValidationItem[]) {
      this.inputFields = this.inputFields.map((fieldConfig: IField) => {
        const validation = validationStatuses.find(
          (validationItem: typeValidationItem) => validationItem.code === fieldConfig.code
        );
        return validation ? { ...fieldConfig, validStatus: validation.status } : fieldConfig;
      });
    },

    handlerSubmit() {
      const validationStatuses = validateForm(this.inputFields, this.submitPayload);
      const isHaveError = validationStatuses.some((validationItem: typeValidationItem) => !validationItem.status);
      this.setValidation(validationStatuses);

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
    margin-bottom: 30px;
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
      padding: 20px 20px 40px 20px;
    }
  }
  .btn-submit {
    width: 100px;
    height: 40px;
    position: absolute;
    left: 50%;
    bottom: -23px;
    transform: translateX(-50%);
    @include font-settings(1.6rem, 1.2, 400, $color-white, $decor-font);
  }
}
</style>