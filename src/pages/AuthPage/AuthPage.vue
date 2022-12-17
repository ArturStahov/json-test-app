<template lang="pug">
.auth-wrapper
  v-card.mx-auto(width='400', prepend-icon='mdi-home')
    template(v-slot:title) This is a title
      v-card-text This is content
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '../../stor/userStor';

export default defineComponent({
  name: 'AuthPage',
  components: {},

  setup() {
    const userStor = useUserStore();

    return { userStor };
  },
  computed: {
    user() {
      return this.userStor.getUser;
    },
  },
});
</script>

<style scoped lang="scss">
.auth-wrapper {
  background-image: url('./images/bg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>