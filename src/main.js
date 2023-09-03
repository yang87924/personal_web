import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index";
import store from "./store";
// import axios from "axios";
// import VueAxios from "vue-axios";
//註冊自己的組件
import yang from "@/components/yang/index";
//import  '@/assets/fonts/font.css';
const app = createApp(App);
app.use(router);
app.use(store);
// app.use(VueAxios, axios);
app.use(yang);
app.mount("#app");
