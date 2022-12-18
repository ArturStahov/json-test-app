import { createApp } from 'vue';

import 'vuetify/styles';
import 'normalize.css';
import './style/main.scss';
import '@fortawesome/fontawesome-free/css/all.css'

import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { initAppInstance } from './services/common.service';


import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, fa } from 'vuetify/iconsets/fa'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      fa,
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
