<template lang="pug">
.text-input
  v-text-field(
    variant='outlined',
    :type='visibleEyeIcon ? getType : fieldConfig.type',
    :label='fieldConfig.label',
    :placeholder='fieldConfig.placeholder',
    v-model='inputValue'
  )
    template(#append-inner, v-if='visibleEyeIcon')
      v-icon(:icon='getEyeIcon', @click='handlerClickAppend')
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextInput',
  props: {
    fieldConfig: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    inputValue: '',
    show: false,
  }),
  computed: {
    getEyeIcon() {
      return this.show ? 'fas fa-eye' : 'fa-solid fa-eye-slash';
    },
    visibleEyeIcon() {
      return this.fieldConfig.code === 'password' || this.fieldConfig.code === 'repassword';
    },
    getType() {
      return this.show ? 'text' : 'password';
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
        this.$emit('change', value);
      },
    },
  },
});
</script>

<style scoped lang="scss">
@import '../../style/theme.scss';
.text-input {
}
</style>