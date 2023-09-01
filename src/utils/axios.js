import { baseUrl } from "./env";
import axios from "axios";
const service = axios.create({
  //process.env.NODE_ENV == "development"用來判斷是否為開發環境
  //easy-mpck服務掛了，暫不使用
  baseURL: baseUrl,
  timeout: 5000,
});
//添加請求攔截器
service.interceptors.request.use(
  //在發送請求之前做些甚麼
  (config) => {
    return config;
  },
  //對請求錯誤做點甚麼
  (error) => {
    console.log(error);
    return Promise.reject();
  }
);
//添加響應攔截器
service.interceptors.response.use(
  //對響應數據做點甚麼
  (response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      return Promise.reject();
    }
  },
  //對響應錯誤做點事
  (error) => {
    console.log(error);
    return Promise.reject();
  }
);
export default service;
