<template>
  <div class="wall-message">
    <p class="title">{{ wallType[id].name }}</p>
    <p class="slogan">{{ wallType[id].slogan }}</p>
    <div class="label">
      <p class="label-list" :class="{lbselected:nlabel==-1}" @click="selectNode(-1)">全部</p>
      <p class="label-list" :class="{lbselected:nlabel==index}" @click="selectNode(index)" v-for="(e,index) in label[id]" :key="index">{{e}}</p>
    </div>
    <div class="card" :style="{width:nWidth+'px'}">
      <node-card v-for="(e,index) in note" :key="index" :note="e" class="card-inner" :width="'288px'"></node-card>
    </div>
    <div class="add" :style="{bottom:addBottom+'px'}" @click="changeModal" v-show="!modal">
      <span class="iconfont icon-tianjia"></span>
    </div>
    <yang-modal :title="title" @cloose="changeModal" :isModal="modal">
      <NewCard :id="id" @addClose="changeModal"></NewCard>
    </yang-modal>
  </div>
</template>

<script>
import { wallType, label } from "@/utils/data";
import nodeCard from "@/components/NoteCard.vue";
import NodeCard from "@/components/NoteCard.vue";
import {note} from "../../mock/index";
import YangModal from "@/components/YangModal.vue";
import NewCard from "@/components/NewCard.vue";
export default {
  components: {
    NodeCard,
    YangModal,
    NewCard,
  },
  data() {
    return {
      wallType,
      label,
      nodeCard,
      id: 0, //留言牆與照片牆的切換id
      nlabel:-1,//當前對應的標籤
      note:note.data,
      nWidth:0,//卡片模塊寬度
      addBottom:30,//add按鈕距離底部高度
      title:'寫留言',//新建標題
      modal:false,//是否調用彈窗
    };
  },
  methods:{
    selectNode(e){
      this.nlabel=e;
    },
    //note的寬度
    noteWidth(){
      let wWidth=document.body.clientWidth;
      this.nWidth=Math.floor((wWidth-120)/300)*300
    },
    //監聽卷軸
    scrollBottpm(){
      //距離頂部高度
      let scrollTop=document.documentElement.scrollTop ||document.body.scrollTop;
      //畫面高度
      let clientHeight=document.documentElement.clientHeight;
      //內容高度
      let scrollHeight=document.documentElement.scrollHeight;
      if(scrollTop+clientHeight+230>=scrollHeight){
        this.addBottom=scrollTop+clientHeight+230-scrollHeight;
      }else {
        this.addBottom=30
      }
    },
    //切換視窗
    changeModal(){
      this.modal=!this.modal;
    },
    //點擊打開
    addButtom(){
      this.modal=true;
    }
  },
  mounted() {
    this.noteWidth();
    //監聽螢幕寬度
    window.addEventListener('resize',this.noteWidth)
    //監聽捲動高度變化
    window.addEventListener('scroll',this.scrollBottpm)
  },
  unmounted() {
    //監聽螢幕寬度
    window.addEventListener('resize',this.noteWidth)
    //監聽捲動高度變化
    window.addEventListener('scroll',this.scrollBottpm)
  }
};
</script>

<style lang="less" scoped>
.wall-message {
  padding-top: 52px;

  .title {
    font-size: 56px;
    padding-bottom: 8px;
    font-size: 56px;
    color: @gray-1;
    text-align: center;
    font-weight: 600;
  }
  .slogan {
    color: @gray-2;
    text-align: center;
  }
  .label{
    display: flex;
    justify-content: center;
    margin-top: 40px;

    .label-list{
      padding: 0 14px;
      display: flex;
      align-items: center;
      height: 30px;
      margin: @padding-4;
      color:@gray-2;
      box-sizing: border-box;
      cursor: pointer;
    }
    .lbselected{
      color:@gray-1;
      font-weight: 600;
      border: 1px solid @gray-1;
      border-radius: 16px;
    }
  }
  .card{
    display: flex;
    flex-wrap: wrap;
    padding-top: 28px;
    margin: auto;
    .card-inner{
      margin: 6px;
    }
  }
  .add{
    width: 56px;
    height: 56px;
    background: @gray-1;
    box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.8);
    border-radius: 28px;
    position: fixed;
    right: 30px;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    transform: @tr;
    .icon-tianjia{
      color: @gray-10;
      font-size: 24px;
    }
  }
}
</style>
