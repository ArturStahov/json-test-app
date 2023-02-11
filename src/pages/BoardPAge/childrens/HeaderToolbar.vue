<template lang="pug">
v-toolbar.page-header(density="compact")
  v-app-bar-nav-icon.ma-0(
    color='#ffef7c'
    @click.stop="actionMenuToggle"
  )
  v-spacer
  v-list-item(
    :prepend-avatar="avatar"
  )

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderToolbar',
  props: {
   user: {
    type: Object,
   }
  },
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
  computed: {
    avatar() {
      return this.user?.avatar || './images/default.png';
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