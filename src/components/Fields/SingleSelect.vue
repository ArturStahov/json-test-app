<template lang="pug">
v-select.single-select(
  return-object
  :chips="chips"
  label="Select"
  item-value='code'
  item-title='label'
  :items="list"
  variant="solo"
  v-model='selectedValue'
)
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SingleSelect',
  props: {
   list: {
    type: Array,
    default: () => [
      {label: 'Test', code: 'test'},
    ]
   },
   chips: {
    type: Boolean,
    default: true
   }
    
  },
  data: () => ({
    selectedValue: { label: 'Test', code: 'test' }
  }),
  created() {
    this.selectedValue = this.list[0] as { label: 'Test', code: 'test' };
    this.$emit('change-value', this.selectedValue)
  },
  computed: {
    
  },
  methods: {
   
  },

  watch: {
   'selectedValue': {
      handler() {
        this.$emit('change-value', this.selectedValue)
      }
    }
  },
});
</script>

<style scoped lang="scss">
@import '../../style/theme.scss';
.single-select {
  max-height: 40px;
}</style>