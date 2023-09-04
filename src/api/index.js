import fetch from "@/utils/axios";
//獲取IP
export const signIpApi = () => fetch.post("/signip");
//建立wall
export const insertWallApi = (data) => fetch.post("/insertwall", data);
//查詢牆
export const findWallPageApi = (data) => fetch.post("/findwallpage", data);
//反饋
export const insertFeedbackApi = (data) => fetch.post("/insertfeedback", data);
//評論
export const insertCommentApi = (data) => fetch.post("/insertcomment", data);
//獲取評論
export const findCommentPageApi = (data) => fetch.post("/findcommentpage", data);
//上傳圖片
export const profileApi = (data) => fetch.post("/profile", data);


