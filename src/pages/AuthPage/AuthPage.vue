<template lang="pug">
.auth-wrapper
  v-container.d-flex.justify-center.flex-lg-nowrap.flex-md-nowrap
    v-row.mx-0.my-0.justify-center
      v-col
        p TEXT HELOW
    v-row.mx-0.my-0.justify-center
      v-col.d-flex.flex-column.align-center
        ToggleButton(@selected-value='handlerToggleForm')
        AuthForm
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '../../stor/userStor';
import AuthForm from '../../components/Auth/AuthForm.vue';
import ToggleButton from '../../components/ToggleButton/ToggleButton.vue';

export default defineComponent({
  name: 'AuthPage',
  components: {
    AuthForm,
    ToggleButton,
  },

  setup() {
    const userStor = useUserStore();

    const handlerToggleForm = (selected: string) => {
      console.log('selected', selected);
    };

    return { userStor, handlerToggleForm };
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
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('./images/bg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>