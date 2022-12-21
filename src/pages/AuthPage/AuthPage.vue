<template lang="pug">
.auth-wrapper
  v-container.d-flex.justify-center.flex-wrap.flex-lg-nowrap.flex-md-nowrap.align-center
    v-row.mx-0.my-0.justify-center
      v-col.logo-wrapper
        p.logo {{ "JSON-cactus" }}
          span {{ `test:you:feature:)` }}
        .logo-cactus
    v-row.mx-0.my-0.justify-center
      v-col.d-flex.flex-column.align-center
        ToggleButton.toggle-group(
          @selected-value='handlerToggleForm',
          :defaultValue='startAuthAction',
          :config='toggleConfig'
        )
        AuthForm(:config='authConfig', v-if='authConfig', :key='refreshKey')
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useUserStore } from '../../stor/userStor';
import AuthForm from '../../components/Auth/AuthForm.vue';
import ToggleButton from '../../components/ToggleButton/ToggleButton.vue';
import { authActions } from '../../constants/auth';
import { getAuthConfig } from '../../services/auth.service';
import { IAuthConfig, typesAction } from '@/interfaces/auth.interface';

export default defineComponent({
  name: 'AuthPage',
  components: {
    AuthForm,
    ToggleButton,
  },

  setup() {
    const userStor = useUserStore();
    const startAuthAction = authActions.LOGIN;
    const toggleConfig = {
      actions: [
        {
          icon: 'fas fa-sign-in',
          value: authActions.LOGIN,
        },
        {
          icon: 'fas fa-user-plus',
          value: authActions.REGISTRATION,
        },
      ],
    };
    const authConfig = ref<IAuthConfig | null>(null);
    const refreshKey = ref<number>(0);

    onMounted(() => {
      authConfig.value = getAuthConfig(startAuthAction);
    });

    const handlerToggleForm = (authAction: typesAction) => {
      authConfig.value = getAuthConfig(authAction);
      refreshKey.value += 1;
      console.log(authConfig.value);
    };

    return { userStor, handlerToggleForm, startAuthAction, authConfig, toggleConfig, refreshKey };
  },
  computed: {
    user() {
      return this.userStor.getUser;
    },
  },
});
</script>

<style scoped lang="scss">
@import '../../style/theme.scss';
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

  .v-container {
    height: 100%;
  }

  .logo-wrapper {
    position: relative;
  }

  .logo {
    @include font-settings(4rem, 1.2, 400, $color-blue, $decor-font);
    position: relative;
    z-index: 9;
    padding: 10px;
    background: $color-light-yellow;
    border-radius: 20px;
    border: 5px dotted $color-green;
    display: flex;
    flex-direction: column;
    span {
      @include font-settings(2rem, 1.2, 400, $color-green, $decor-font);
    }
  }

  .logo-cactus {
    width: 200px;
    height: 180px;
    position: absolute;
    right: 0;
    top: -160px;
    background-image: url('./images/cactus.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .toggle-group {
    :deep(.v-btn) {
      border-top-left-radius: 27px;
      border-top-right-radius: 27px;
      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
}
</style>