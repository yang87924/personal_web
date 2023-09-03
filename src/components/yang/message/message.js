import { createVNode, render } from "vue";
import YangMessageVue from "./YangMessage.vue";

const divVNode = createVNode('div', {
    class: 'xtx-message-container'
});
render(divVNode, document.body);
const div = divVNode.el;

const YangMessage = ({ message, type }) => {
    // 1.動態創建虛擬Dom-createVNode(h)函數
    const comVNode = createVNode(YangMessageVue, {
        message,
        type
    }); 
    //2.渲染到body頁面中，render函數
    //render(comVNode,document.body)
    render(comVNode, div); 

    // 3. 過6秒後，移除dom
    setTimeout(() => {
        render(null, div);
    }, 6000);
};

export default YangMessage;
