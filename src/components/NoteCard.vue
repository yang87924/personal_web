<template>
  <div
    class="yang-node-card"
    :style="{ width: width, background: cardColor[card.color] }"
  >
    <div class="top">
      <p class="time">{{ dateOne(card.moment) }}</p>
      <p class="label">{{ label[card.type][card.label] }}</p>
    </div>
    <p class="message" @click="toDeail">{{ card.message }}</p>
    <div class="foot">
      <div class="foot-left">
        <div class="icon" @click="clickLike">
          <span
            class="iconfont icon-aixin1"
            :class="{ islike: card.islike[0].count > 0 }"
          ></span>
          <span class="value">{{ card.like[0].count }}</span>
        </div>
        <div class="icon" v-show="card.comcount[0].count > 0">
          <span class="iconfont icon-liuyan"></span>
          <span class="value">{{ card.comcount[0].count }}</span>
        </div>
      </div>
      <div class="name">{{ card.name }}</div>
    </div>
  </div>
</template>
<script>
import "@/assets/fonts/font.ttf";
import { label, cardColor } from "@/utils/data";
import { dateOne } from "@/utils/YangFunction";
import { insertFeedbackApi } from "@/api/index";
export default {
  data() {
    return {
      label,
      cardColor,
      dateOne,
      user:this.$store.state.user,
    };
  },
  props: {
    width: {
      default: "100%",
    },
    note: {
      default: {},
    },
  },
  computed: {
    card() {
      return this.note;
    },
  },
  created() {
     //console.log(this.card)
  },
  methods: {
    // 顯示詳情
    toDeail() {
      this.$emit("toDetail");
    },
    //按讚
    clickLike(){
      if(this.card.islike[0].count==0){
        let data={
          wallId:this.card.id,
          userId:this.user.id,
          type:0,//0是喜歡
          moment:new Date(),
        }
        insertFeedbackApi(data).then(()=>{
          //反饋完成
          this.card.like[0].count++;
          this.card.islike[0].count++;
        })
      }
    }
  },
};
</script>
<style scoped lang="less">
@font-face {
  font-family: "fa";
  src: url("@/assets/fonts/SYWSRSDRY.ttf");
}
.yang-node-card {
  height: 240px;
  padding: 10px @padding-20;
  box-sizing: border-box;
  position: relative;
  .top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
    p {
      font-size: @size-12;
      color: @gray-3;
    }
  }
  .message {
    height: 140px;
    font-family: fa;
    font-size: 15px;
    color: @gray-1;
    cursor: pointer;
  }
  .foot {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 16px;
    left: 0;
    padding: 0 @padding-20;
    box-sizing: border-box;
    width: 100%;
    .foot-left {
      display: flex;
      .value {
        font-size: @size-12;
        color: @gray-3;
        line-height: 30px;
        padding-left: @padding-4;
      }
      .iconfont {
        font-size: @size-16;
        color: @gray-3;
      }
      .icon {
        padding-right: @padding-8;
        display: flex;
        line-height: 30px;
        align-content: center;
      }
      .icon-aixin1 {
        cursor: pointer;
        transition: @tr;

        &:hover {
          color: @like;
        }
      }
      .islike {
        color: @like;
      }
    }
  }
  .name {
    font-family: SYWSRSDRY;
    font-size: 17px;
    color: @gray-1;
  }
}
</style>
