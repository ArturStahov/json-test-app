<template lang="pug">
.UrlControl
   v-text-field.url-input(
     single-line,
     hide-details,
     density='compact',
     variant='solo',
     bg-color='#e1fdd7',
     :type='"text"',
     :label='"input api url"',
     :placeholder="'https://example.com'"
     v-model='inputValue'
     @input.stop='change'
   )
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UrlControl',
  props: {
  },
  data: () => ({
    inputValue: ''
  }),

  created() {
   
  },
  methods: {
    change() {
      this.$emit('inputUrl', this.inputValue)
    }
  }
});
</script>

<style scoped lang="scss">
@import '../../style/theme.scss';
.UrlControl {
  width: 600px;
  .url-input {
    width: 100%;
  }
}
</style>