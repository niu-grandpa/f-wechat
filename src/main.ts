import { createApp } from 'vue';
import { Vant } from './plugin/vant';
import router from './router';
import App from './App.vue';

const app = createApp(App);

app.mount('#app');
app.use(router);
Vant.forEach(comp => app.use(comp));
