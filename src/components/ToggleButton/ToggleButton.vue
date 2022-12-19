<template lang="pug">
v-btn-toggle(v-model='toggle', rounded='0', color='deep-purple-accent-3', group, mandatory)
  v-btn(v-for='(action, idx) in actions', :key='idx', :value='action.value')
    v-icon(:icon='action.icon')
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ToggleButton',
  props: {
    config: {
      type: Object,
      required: true,
    },
    defaultValue: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    toggle: '',
  }),

  created() {
    this.toggle = this.defaultValue;
  },
  computed: {
    actions() {
      return this.config.actions;
    },
  },
  watch: {
    toggle: {
      handler(value) {
        this.$emit('selected-value', value);
      },
    },
  },
});
</script>

<style scoped lang="scss">
</style>