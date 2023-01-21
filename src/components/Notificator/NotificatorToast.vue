<template lang="pug">
v-snackbar.Notificator(v-model="show" :timeout="7000" color="#3d7a29" multi-line class="ma-2") {{ message }}
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { emitter } from '../../services/emitter';
import { notificatorEmitEvents } from '../../events/notificator.events';
import { INotificatorEvent } from '@/interfaces/notificator.interface';

const TIME_OUT = 7000;

export default defineComponent({
  name: 'NotificatorToast',

  setup() {
    const show = ref<boolean>(false);

    const message = ref<string>('');

    let idTimer: NodeJS.Timeout | null = null;
    
    const handlerOpen = (event: INotificatorEvent | any) => {
      message.value = event.msg;
      show.value = true;
      idTimer && clearTimeout(idTimer);
      idTimer = setTimer()
    }

    const setTimer = () => {
     return setTimeout(() => {
        show.value = false;
        message.value = ''
        console.log('CLOSE-TOAST')
      }, TIME_OUT);
    }

    onMounted(() => {
      emitter.on(notificatorEmitEvents.SHOW_TOAST, handlerOpen);
    });

    onUnmounted(() => {
      emitter.off(notificatorEmitEvents.SHOW_TOAST, handlerOpen);
    });

    return { show, message };
  },
});
</script>

<style scoped lang="scss">
@import '../../style/theme.scss';
.Notificator {
  :deep(.v-overlay__content) {
    bottom: 2% !important;
    .v-snackbar__content {
      font-size: 1.4rem;
    }
  }
}
</style>