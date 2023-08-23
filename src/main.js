import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
//import  '@/assets/fonts/font.css';
const app=createApp(App)
app.use(router);
app.use(store);
app.use(VueAxios,axios);
app.mount('#app')