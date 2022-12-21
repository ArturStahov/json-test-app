<template lang="pug">
.text-input
  v-text-field(
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
        required: true,
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
      return `${this.inputValue.length} / 50`;
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
  :deep(.v-input .v-input__slot) {
    border-radius: 100px;
  }
}
</style>