const path = require("path");

module.exports = {
  publicPath: "./",
  transpileDependencies: true,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/styles/commons.less")], //引入全局less文件
    },
  },
};
