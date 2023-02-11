<template lang="pug">
.UrlInputControl
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
   )
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UrlInputControl',
  props: {
  },
  data: () => ({
    inputValue: ''
  }),

  created() {
   
  },
  computed: {
   
  },
  watch: {
   
  },
});
</script>

<style scoped lang="scss">
@import '../../style/theme.scss';
.UrlInputControl {
  width: 600px;
  .url-input {
    width: 100%;
  }
}
</style>