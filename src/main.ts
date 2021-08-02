import { createApp } from 'vue';
import { Vant } from './plugin/vant';
import router from './router';
import App from './App.vue';

const app = createApp(App);

app.use(router);
Vant.forEach(comp => app.use(comp, { lazyComponent: true }));
app.mount('#app');
