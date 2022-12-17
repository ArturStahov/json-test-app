import { createApp } from 'vue';
import './style.css';

import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { initAppInstance } from './services/common.service';

import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
});

const app = createApp(App);
initAppInstance(app);
const pinia = createPinia();

app.use(vuetify);
app.use(router);
app.use(pinia);


app.mount('#app');
