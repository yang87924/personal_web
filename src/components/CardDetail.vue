<template>
<div class="card-detail">
  <div class="top-bt">
    <p class="revoke">聯絡紙條主人</p>
    <p class="report">檢舉</p>
  </div>
  <note-card :note="card"></note-card>
  <div class="form">
    <textarea class="message"></textarea>
    <div class="bt">
      <input type="text" class="name">
      <yang-button>確定</yang-button>
    </div>
  </div>
  <p class="title">評論{{card.comment}}</p>
  <div class="commont">
    <div class="commont-li" v-for="(e,index) in commont" :key="index">
      <div class="user-head" :style="{backgroundImage:portrait[e.imgurl]}"> </div>
      <div class="comm-m">
        <div class="m-top">
          <p class="name">{{e.name}}</p>
          <p class="time">{{dateOne(e.moment)}}</p>
        </div>
        <div class="mm">{{e.message}}</div>
      </div>
    </div>
  </div>
</div>
</template>
<script >
import noteCard from "@/components/NoteCard.vue";
import yangButton from "@/components/YangButton.vue";
import {commont} from "../../mock/index";
import {portrait} from "@/utils/data";
import {dateOne} from "@/utils/YangFunction";

export default {
  data(){
    return{
      commont:commont.data,
      portrait,
      dateOne,
    }
  },
  props:{
    card:{
      default:{},
    }
  },
  components:{
    noteCard,
    yangButton,
  }
}
</script>
<style scoped lang="less">
.card-detail{
  position: relative;
  padding: @padding-20;
  .top-bt{
    position: fixed;
    top: 0;
    left: 0;
    padding: @padding-20;
    display: flex;
    .revoke{
      color: @primary-color;
      cursor: pointer;
      padding-right: 30px;
      font-size: @size-16;
    }
    .report{
      font-size: @size-16;
      color: @warning-color;
      cursor: pointer;
    }
  }
  .form{
    .message{
      background: none;
      height: 56px;
      border: 1px solid rgba(148,148,148,1);
      resize: none;
      padding: @padding-8;
      box-sizing: border-box;
      width: 100%;
      margin-top: @padding-12;
    }
    .bt{
      display: flex;
      padding-top: 6px;
      justify-content: space-between;
    }
    .name{
      width: 200px;
      box-sizing: border-box;
      padding: 7px;
      background: none;
      border: 1px solid rgba(148,148,148,1);
      line-height: 20px;
    }
  }
  .title{
    font-weight: 600;
    padding-top: 30px;
    padding-bottom: 20px;
  }
  .commont-li{
    display: flex;
    padding-bottom: 30px;

    .user-head{
      flex: none;
      width: 28px;
      height: 28px;
      border-radius: 20px;
      overflow: hidden;
      //background-image: linear-gradient(180deg,#FFA9D9 0%,#E83D3D 100%);
    }
    .comm-m{
      padding-left: @padding-8;
    }
    .m-top{
      display: flex;
      align-items: center;
      .name{
        font-weight: 600;
      }
      .title{
        font-size: @size-12;
        padding-left: @padding-4;
        color: @gray-3;
      }
    }
    .mm{
      padding-top: @padding-4;
    }
  }
}
</style>