<template lang="pug">
v-toolbar.page-header(density="compact")
  v-app-bar-nav-icon.ma-0(
    color='#ffef7c'
    @click.stop="actionMenuToggle"
  )
  v-spacer
  v-list-item(
    prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
    title="John Leider"
  )

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderToolbar',
  components: {
  },
  data() {
    return {
    }
  },

  methods: {
    actionMenuToggle() {
      this.$emit('action-menu-toggle')
    }
  },
});
</script>

<style scoped lang="scss">
@import '../../../style/theme.scss';
.page-header {
  padding: 5px;
  box-shadow: $box-shadow;
  background: $dark-green;
}
</style>