import Message from './message/message.js';
//vue3註冊全局組件庫寫法
//app.component(組件名，組件文件)

//導出一個配置，用於app.user()安裝組件庫使用
export default {
    install(app) {
        //全局掛載原型函數 過組件實例調用的屬性，this.$messgae
        // app.config.globalProperties.Model=abcedfg
        app.config.globalProperties.$message=Message
    }
}