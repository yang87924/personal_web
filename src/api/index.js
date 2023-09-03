import fetch from "@/utils/axios";
//獲取IP
export const signIpApi = () => fetch.post("/signip");
//建立wall
export const insertWallApi = (data) => fetch.post("/insertwall", data);
//查詢牆
export const findWallPageApi = (data) => fetch.post("/findwallpage", data);
