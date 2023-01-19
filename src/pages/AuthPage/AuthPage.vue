<template lang="pug">
.auth-wrapper
  v-container.auth-container.d-flex.justify-center.flex-wrap.flex-lg-nowrap.flex-md-nowrap.align-center
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
          :config='toggleConfig',
          :toggleSetValue='toggleSetValue'
        )
        AuthForm(:config='authConfig', v-if='authConfig', :key='refreshKey')
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '../../stor/userStor';
import AuthForm from '../../components/Auth/AuthForm.vue';
import ToggleButton from '../../components/ToggleButton/ToggleButton.vue';
import { authActions } from '../../constants/auth';
import { authEmitEvents } from '../../events/auth.events';
import { getAuthConfig } from '../../services/auth.service';
import { IAuthConfig, ILoginErrorEvent, typesAction } from '@/interfaces/auth.interface';
import { emitter } from '../../services/emitter';
import { redirectTo } from '../../services/redirect.service';
import { Pages } from '@/constants/pages';
import { IToggleConfigInterface } from '@/interfaces/toggle.interface';

export default defineComponent({
  name: 'AuthPage',
  components: {
    AuthForm,
    ToggleButton,
  },

  setup() {
    const userStor = useUserStore();
    const startAuthAction = authActions.LOGIN;
    const toggleConfig: IToggleConfigInterface = {
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
    const toggleSetValue = ref<string>('');

    const handlerRegistrationSuccess = () => {
      toggleSetValue.value = `${authActions.LOGIN}`;
    }

    const handlerLoginSuccess = () => {
      redirectTo(Pages.BOARD)
    }

    onMounted(() => {
      authConfig.value = getAuthConfig(startAuthAction);
      emitter.on(authEmitEvents.LOGIN_SUCCESS, handlerLoginSuccess);
      emitter.on(authEmitEvents.REGISTRATION_SUCCESS, handlerRegistrationSuccess);
    });

    onUnmounted(() => {
      emitter.off(authEmitEvents.LOGIN_SUCCESS, handlerLoginSuccess);
      emitter.off(authEmitEvents.REGISTRATION_SUCCESS, handlerRegistrationSuccess);
    });

    const handlerToggleForm = (authAction: typesAction) => {
      authConfig.value = getAuthConfig(authAction);
      refreshKey.value += 1;
      console.log(authConfig.value);
    };

    return { userStor, handlerToggleForm, startAuthAction, authConfig, toggleConfig, refreshKey, toggleSetValue };
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
  background-image: url('./images/bg.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;

  .auth-container {
    height: 100%;
    max-width: 1100px;
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