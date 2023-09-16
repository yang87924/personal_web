//
// baseUrl:域名地址
// routerMode:路由模式
// baseImgPath:圖片存放地址
let baseUrl = "";
let routerMode = "hash";
let baseImgPath;
if (process.env.NODE_ENV != "development") {
  baseUrl = "https://yangyang.myang.pp.ua";
  baseImgPath = "https://localhost:3003";
} else {
  baseUrl = "https://yangyang.myang.pp.ua";
  baseImgPath = "https://52.194.218.88:3003";
}
export { baseUrl, routerMode, baseImgPath };
