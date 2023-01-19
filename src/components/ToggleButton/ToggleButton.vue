<template lang="pug">
v-btn-toggle(v-model='toggle', rounded='0', color='#ffef7c', group, mandatory)
  v-btn(v-for='(action, idx) in actions', :key='idx', :value='action.value')
    v-icon(:icon='action.icon')
</template>

<script lang="ts">
import { toggleConfigAction } from '@/interfaces/toggle.interface';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ToggleButton',
  props: {
    config: {
      type: Object,
      required: true,
      default: () => ({
        actions: [
          {
            icon: 'fas fa-sign-in',
            value: 'login',
          },
          {
            icon: 'fas fa-user-plus',
            value: 'registration',
          },
        ],
      }),
    },
    defaultValue: {
      type: String,
      required: true,
    },
    toggleSetValue: {
      type: String,
    }
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
    'toggle': {
      handler(value) {
        this.$emit('selected-value', value);
      },
    },
    'toggleSetValue': {
      handler(value) {
        if (value) {
          this.toggle = value;
        }
      },
      immediate: false
    },
  },
});
</script>

<style scoped lang="scss">
@import '../../style/theme.scss';
:deep(.v-btn) {
  background: $color-brown;
}
</style>