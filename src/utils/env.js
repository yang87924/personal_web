//
// baseUrl:域名地址
// routerMode:路由模式
// baseImgPath:圖片存放地址
let baseUrl = "";
let routerMode = "hash";
let baseImgPath;
// if (process.env.NODE_ENV == "development") {
baseUrl = "http://localhost:3000";
baseImgPath = "https://localhost:3000";
// } else {
//   baseUrl = "http:localhost:3000";
//   baseImgPath = "https:localhost:3003";
// }
export { baseUrl, routerMode, baseImgPath };
