import '@/assets/styles/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import { clickOutside } from './directives/v-click-outside.js'
import { createPinia } from 'pinia';

/* createApp(App).mount('#app') */

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.directive('click-outside', clickOutside);
app.mount('#app');

