<template>
  <transition name="view">
<div class="yang-viewer" v-if="isView">
  <div class="bg"></div>
  <div class="viewer-photo">
    <img :src="baseUrl+photos[nowNumber]" class="photo-img"/>
  </div>
  <div class="switch sw-left">
    <span class="iconfont icon-xiangzuo" @click="changeNumber(0)" v-show="nowNumber>0"></span>
  </div>
  <div class="switch sw-right">
    <span class="iconfont icon-xiangyou" @click="changeNumber(1)" v-show="nowNumber<photos.length-1"></span>
  </div>
</div>
  </transition>
</template>
<script>
import {baseUrl }from "@/utils/env"
export default {
  data(){
    return{
      baseUrl,
    }
  },
  props:{
    photos:{
      default:[],
    },
    nowNumber:{
      type:Number,
      default: 0,
    },
    isView:{
      default:false,
    },
  },
  methods:{
    changeNumber(e){
      this.$emit('viewSwitch',e)
      // if(e==0){
      //   this.number=this.number-1;
      // }else {
      //   this.number=this.number+1;
      // }
    }
  },
  computed:{
    number(){
      return this.nowNumber;
    }
  }
}
</script>



<style scoped lang="less">
.view{
  &-enter{
    &-from{
      opacity: 0;
    }
    &-active{
      transition: all 0.2s ease-out;
    }
    &-to{
      opacity: 1;
    }
  }
  //出場
  &-leave{
    &-from{
      opacity: 1;
    }
    &-active{
      transition: all 0.2s ease-in;
    }
    &-to{
      opacity: 0;
    }
  }
}
.yang-viewer{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;


  .bg{
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(20px);
    height: 100%;
    width: 100%;
  }
  .viewer-photo{
    position: absolute;
    padding: 82px 454px 0px 96px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    align-items: center;

    .img{
      max-width: 100%;

    }
  }
  .switch{
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: @gray-3;
    color: @gray-10;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;//上下居中
    justify-content: center;//左右居中
    opacity: 0.5;
    text-replace: @tr;
    cursor: pointer;
    .iconfont{
      font-size: 24px;
    }&:hover{
      opacity: 1;
         }
  }
  .sw-left{
    left: 20px;
  }
  .sw-right{
    right: 380px;
  }
}
</style>