<template lang="pug">
.board-wrapper
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '../../stor/userStor';

export default defineComponent({
  name: 'BoardPage',
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
.board-wrapper {
  background-color: rgb(212, 233, 117);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>