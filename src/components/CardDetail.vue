<template>
  <div class="card-detail">
    <div class="top-bt">
      <p class="revoke">聯絡紙條主人</p>
      <p class="report">檢舉</p>
    </div>
    <note-card :note="card"></note-card>
    <div class="form">
      <textarea
        class="message"
        placeholder="請輸入..."
        v-model="discuss"
      ></textarea>
      <div class="bt">
        <input type="text" class="name" placeholder="簽名" v-model="name" />
        <yang-button :class="{ notwallowed: !isDis }" @click="sumit"
          >評論</yang-button
        >
      </div>
    </div>
    <p class="title">評論{{ cards.comcount[0].count }}</p>
    <div class="commont">
      <div class="commont-li" v-for="(e, index) in comments" :key="index">
        <div
          class="user-head"
          :style="{ backgroundImage: portrait[e.imgurl] }"
        ></div>
        <div class="comm-m">
          <div class="m-top">
            <p class="name">{{ e.name }}</p>
            <p class="time">{{ dateOne(e.moment) }}</p>
          </div>
          <div class="mm">{{ e.comment }}</div>
        </div>
      </div>
      <p class="more" @click="getComent" v-show="nowpage > 0">加載更多</p>
    </div>
  </div>
</template>
<script>
import noteCard from "@/components/NoteCard.vue";
import yangButton from "@/components/YangButton.vue";

import { portrait } from "@/utils/data";
import { dateOne } from "@/utils/YangFunction";
import { insertCommentApi } from "@/api/index";
import { findCommentPageApi } from "@/api/index";

export default {
  data() {
    return {
      comments: [],
      portrait,
      dateOne,
      discuss: "", //輸入的內容
      name: "匿名", //姓名
      user: this.$store.state.user,
      nowpage: 1, //當前頁面
      pagesize: 2, //每頁顯示的數量
    };
  },
  props: {
    card: {
      default: {},
    },
  },
  computed: {
    isDis() {
      if (this.discuss && this.name) {
        return true;
      } else {
        return false;
      }
    },
    cards() {
      return this.card;
    },
  },
  components: {
    noteCard,
    yangButton,
  },
  methods: {
    sumit() {
      if (this.isDis) {
        //如果有用戶就用投向，沒有就用隨機頭像
        // let img=this.user.type==1?this.user.imgurl:Math.floor(Math.ramdom()*14)
        let img = Math.floor(Math.random() * 14);
        let data = {
          wallId: this.cards.id,
          userId: this.user.id,
          imgurl: img,
          moment: new Date(),
          comment: this.discuss,
          name: this.name,
        };
        console.log(data);
        insertCommentApi(data).then(() => {
          this.comments.unshift(data);
          this.cards.comcount[0].count++;
          //清空評論
          this.discuss = "";
        });
      }
    },

    //獲取評論
    getComent() {
      if (this.nowpage > 0) {
        let data = {
          id: this.card.id,
          page: this.nowpage,
          pagesize: this.pagesize,
        };
        findCommentPageApi(data).then((res) => {
          this.comments = this.comments.concat(res.message);
          //設置下一次的page
          if (res.message.length == this.pagesize) {
            this.nowpage++;
          } else {
            this.nowpage = 0;
          }
        });
      }
    },
  },
  mounted() {
    this.getComent();
  },
  watch: {
    card() {
      //卡片發生變化
      this.nowpage = 1;
      this.comments = [];
      this.getComent();
    },
  },
};
</script>
<style scoped lang="less">
.card-detail {
  position: relative;
  padding: @padding-20;
  .top-bt {
    position: fixed;
    top: 0;
    left: 0;
    padding: @padding-20;
    display: flex;
    .revoke {
      color: @primary-color;
      cursor: pointer;
      padding-right: 30px;
      font-size: @size-16;
    }
    .report {
      font-size: @size-16;
      color: @warning-color;
      cursor: pointer;
    }
  }
  .form {
    .message {
      background: none;
      height: 56px;
      border: 1px solid rgba(148, 148, 148, 1);
      resize: none;
      padding: @padding-8;
      box-sizing: border-box;
      width: 100%;
      margin-top: @padding-12;
    }
    .bt {
      display: flex;
      padding-top: 6px;
      justify-content: space-between;
    }
    .name {
      width: 200px;
      box-sizing: border-box;
      padding: 7px;
      background: none;
      border: 1px solid rgba(148, 148, 148, 1);
      line-height: 20px;
    }
  }
  .title {
    font-weight: 600;
    padding-top: 30px;
    padding-bottom: 20px;
  }
  .more {
    color: @gray-2;
    text-align: center;
    padding-top: 20px;
    cursor: pointer;
  }
  .commont-li {
    display: flex;
    padding-bottom: 30px;

    .user-head {
      flex: none;
      width: 28px;
      height: 28px;
      border-radius: 20px;
      overflow: hidden;
      //background-image: linear-gradient(180deg,#FFA9D9 0%,#E83D3D 100%);
    }
    .comm-m {
      padding-left: @padding-8;
    }
    .m-top {
      display: flex;
      align-items: center;
      .name {
        font-weight: 600;
      }
      .title {
        font-size: @size-12;
        padding-left: @padding-4;
        color: @gray-3;
      }
      p {
        padding-right: 10px;
      }
    }
    .mm {
      padding-top: @padding-4;
    }
  }
}
</style>
