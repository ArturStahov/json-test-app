<template lang="pug">
.navigation-left-sidebar
   v-navigation-drawer(
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
   )
    v-list(density="compact" nav)
      v-list-item(prepend-icon="mdi-home-city" title="Home" value="home")
      v-list-item(prepend-icon="mdi-home-city" title="Home" value="home")
      v-list-item(prepend-icon="mdi-home-city" title="Home" value="home")
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LeftSidebar',
  components: {
  },
  props: {
    openSidebar: {
      type: Boolean,
    }

  },
  data() {
    return {
      drawer: true,
    }
  },
  methods: {
  },
  computed: {
    rail() {
      return this.openSidebar;
    }
  },
});
</script>

<style scoped lang="scss">
@import '../../../style/theme.scss';
.navigation-left-sidebar {
:deep(.v-navigation-drawer) {
    position: absolute !important;
    z-index: 10 !important;
    background: $color-light-yellow-transparent;
  }
}
</style>