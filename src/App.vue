<template lang="pug">
router-view
NotificatorToast
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import NotificatorToast from './components/Notificator/NotificatorToast.vue';
export default defineComponent({
  name: 'App',
  components: {
    NotificatorToast,
  },

});
</script>


<style scoped>
</style>
