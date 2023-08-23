<template>
  <transition name="modal">
    <div class="yang-modal" v-if="isModal">
      <div class="yang-modal-head">
        <p class="modal-name">{{title}}</p>
        <span class="iconfont icon-guanbi" @click="clooseModal"></span>
      </div>
      <div class="yang-modal-main">
        <slot></slot>
<!--        <div class="slot"></div>-->
      </div>
    </div>
  </transition>
</template>
<script setup>
import { defineProps ,defineEmits} from 'vue';
const props = defineProps({
  title: {
    default: '標題'
  },
  isModal:{
    default:false
  }
});
const emit=defineEmits(['cloose']);
function clooseModal(){
  emit('cloose','我是關閉');
}
// onMounted(clooseModal);
props;
</script>

<style scoped lang="less">
.modal{
  &-enter{
    &-from{
    transform: translateX(360px);
  }
    &-active{
      transition: all 0.2s ease-out;
    }
    &-to{
      transform: translateX(0px);
    }
  }
  //出場
  &-leave{
  &-from{
    transform: translateX(0px);
  }
    &-active{
      transition: all 0.2s ease-in;
    }
    &-to{
      transform: translateX(360px);
    }
  }
}
.yang-modal{
  width: 360px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 52px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.80);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);



  .yang-modal-head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: @padding-20;
    box-sizing: border-box;


    .modal-name{
      font-size: 16px;
      color: @gray-1;
      font-weight: 600;
    }
    .icon-guanbi{
      color: @gray-2;
      cursor: pointer;
      padding-left: 8px;
    }
  }
  .yang-modal-main{
    height: 100%;
    overflow-y: auto;
    padding-bottom: 116px;
    box-sizing: border-box;
    overflow-x: auto;
    margin: 2px;
  }
  .slot{
    height: 1200px;
    background: #eee;
  }

  .yang-modal-main::-webkit-scrollbar{
    //捲動調整體樣式
    width: 4px;
    //高寬分別對應行數捲動提的尺寸
    height: 4px;
  }
  .yang-modal-main::-webkit-scrollbar-thumb{
  //烜棟調理的小方塊
    border-radius: 4px;
    background: rgba(0,0,0,0.2);
  }
  .yang-modal-main::-webkit-scrollbar-track{
    //捲動調裡面軌道
    border-radius: 4px;
    background: rgba(0,0,0,0);
  }

}
</style>