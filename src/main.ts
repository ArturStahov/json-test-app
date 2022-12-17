import { createApp } from 'vue'
import './style.css'

import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

import { initAppInstance } from './services/common.service'

const app = createApp(App);
initAppInstance(app);
const pinia = createPinia();

app.use(router)
app.use(pinia)


app.mount('#app')
