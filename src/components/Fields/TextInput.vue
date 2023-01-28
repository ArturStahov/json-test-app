<template lang="pug">
.text-input
  v-text-field(
    v-bind='$attrs',
    single-line,
    hide-details,
    density='compact',
    variant='solo',
    bg-color='#e1fdd7',
    :type='typeField',
    :label='fieldConfig.label',
    :placeholder='fieldConfig.placeholder',
    :maxLength='maxLength',
    v-model='inputValue'
  )
    template(#append-inner, v-if='isPasswordField')
      v-icon(:icon='getEyeIcon', @click='handlerClickAppend', size='18px')
  span.error-message(v-if='!validStatus') {{ errorMessage }}
  span.counter(v-if='visibleCounter') {{ counterValue }}
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextInput',
  props: {
    fieldConfig: {
      type: Object,
      required: true,
      default: () => ({
        code: 'name',
        type: 'text',
        placeholder: 'text',
        label: 'text',
        errorMessage: 'text',
        required: true,
        validStatus: true,
        value: '',
      }),
    },
    isPasswordField: {
      type: Boolean,
      default: false,
    },
    visibleCounter: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: Number,
      default: 50,
    },
  },
  data: () => ({
    inputValue: '',
    show: false,
    validStatus: true,
  }),
  created() {
    this.inputValue = this.fieldConfig.value;
  },
  computed: {
    getEyeIcon() {
      return this.show ? 'fas fa-eye' : 'fa-solid fa-eye-slash';
    },
    typeField() {
      return this.isPasswordField ? this.getType : this.fieldConfig.type;
    },
    getType() {
      return this.show ? 'text' : 'password';
    },
    counterValue() {
      return `${this.inputValue ? this.inputValue.length : 0} / ${this.maxLength}`;
    },
    errorMessage() {
      return this.fieldConfig.errorMessage;
    },
  },
  methods: {
    handlerClickAppend() {
      this.show = !this.show;
    },
  },

  watch: {
    inputValue: {
      handler(value) {
        this.$emit('change-field', value);
      },
    },
    'fieldConfig.validStatus': {
      handler(value) {
        this.validStatus = value;
      },
      deep: true,
    },
  },
});
</script>

<style scoped lang="scss">
@import '../../style/theme.scss';

.text-input {
  position: relative;
  .counter {
    position: absolute;
    bottom: -17px;
    right: 0;
  }
  .error-message {
    position: absolute;
    bottom: -17px;
    left: 15px;
    color: $color-red;
  }
  :deep(.v-input .v-input__slot) {
    border-radius: 100px;
  }
}
</style>