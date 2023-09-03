<template>
  <div class="wall-message">
    <p class="title">{{ wallType[id].name }}</p>
    <p class="slogan">{{ wallType[id].slogan }}</p>
    <div class="label">
      <p
        class="label-list"
        :class="{ lbselected: nlabel == -1 }"
        @click="selectNode(-1)"
      >
        全部
      </p>
      <p
        class="label-list"
        :class="{ lbselected: nlabel == index }"
        @click="selectNode(index)"
        v-for="(e, index) in label[id]"
        :key="index"
      >
        {{ e }}
      </p>
    </div>
    <div class="card" :style="{ width: nWidth + 'px' }" v-show="id == 1">
      <node-card
        v-for="(e, index) in cards"
        :key="index"
        :note="e"
        class="card-inner"
        :width="'288px'"
        :class="{ cardSelected: index == cardSelected }"
        @click="selectedCard(index)"
      ></node-card>
    </div>
    <div class="photo" v-show="id == 2">
      <photo-card
        :photo="e"
        class="photo-card"
        v-for="(e, index) in photo"
        :key="index"
        @click="selectedCard(index)"
      ></photo-card>
    </div>
    <!-- 卡片狀態 -->
    <div class="none-msg" v-if="isOK == 0">
      <img :src="none[id].url" />
      <p>{{ none[id].msg }}</p>
    </div>
    <div class="loading" v-show="isOK == -1">
      <div id="lottile"></div>
      <p>加載中...</p>
    </div>
    <p class="bottom-tip" v-show="page == 0">沒有更多...</p>
    <div
      class="add"
      :style="{ bottom: addBottom + 'px' }"
      @click="addCard"
      v-show="!modal"
    >
      <span class="iconfont icon-tianjia"></span>
    </div>
    <yang-modal :title="title" @cloose="closeModal" :isModal="modal">
      <NewCard
        :id="id"
        @addClose="closeModal"
        v-if="cardSelected == -1"
        @clickbt="newCard"
      ></NewCard>
      <card-detail
        v-if="cardSelected != -1"
        :card="cards[cardSelected]"
      ></card-detail>
    </yang-modal>
    <YangViewer
      :isView="view"
      :photos="photoArr"
      :now-number="cardSelected"
      @viewSwitch="viewSwitch"
    ></YangViewer>
  </div>
</template>

<script>
import { wallType, label, none } from "@/utils/data";
import nodeCard from "@/components/NoteCard.vue";
import NodeCard from "@/components/NoteCard.vue";
import { photo } from "../../mock/index";
import YangModal from "@/components/YangModal.vue";
import NewCard from "@/components/NewCard.vue";
import CardDetail from "@/components/CardDetail.vue";
import PhotoCard from "@/components/PhotoCard.vue";
import YangViewer from "@/components/YangViewer.vue";
import lottie from "lottie-web";
import loading from "@/assets/images/loading4.json";
import { findWallPageApi } from "@/api/index";
export default {
  components: {
    NodeCard,
    YangModal,
    NewCard,
    CardDetail,
    PhotoCard,
    YangViewer,
  },
  data() {
    return {
      wallType,
      label,
      nodeCard,
      nlabel: -1, //當前對應的標籤
      none,
      cards: [],
      photo: photo.data,
      photoArr: [], //圖片列表
      nWidth: 0, //卡片模塊寬度
      addBottom: 30, //add按鈕距離底部高度
      title: "寫留言", //新建標題
      modal: false, //是否調用彈窗
      view: false, //預覽大突
      cardSelected: -1, //當前選擇卡面，沒有選擇=-1
      isOK: 2, //是否加載中，-1為加載狀態，0為沒拿到資料
      //  user: this.$store.state.user,
      page: 1,
      pagesize: 10,
    };
  },
  computed: {
    //留言牆與照片牆的切換id
    id() {
      return this.$route.query.id;
    },
    user() {
      return this.$store.state.user;
    },
    // cards() {
    //   let a = "";
    //   if (this.$route.query.id == 1) {
    //     a = this.note;
    //   } else if (this.$route.query.id == 2) {
    //     a = photo.data;
    //   }
    //   return a;
    // },
  },
  watch: {
    id() {
      this.modal = false;
      this.view = false;
      this.nlabel = -1;
      this.cardSelected = -1;
    },
  },
  methods: {
    selectNode(e) {
      this.nlabel = e;
      this.cards = [];
      this.page = 1;
      this.getWallCard(this.id);
    },
    //note的寬度
    noteWidth() {
      let wWidth = document.body.clientWidth;
      this.nWidth = Math.floor((wWidth - 120) / 300) * 300;
    },
    //監聽卷軸
    scrollBottpm() {
      //距離頂部高度
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //畫面高度
      let clientHeight = document.documentElement.clientHeight;
      //內容高度
      let scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop + clientHeight + 230 >= scrollHeight) {
        this.addBottom = scrollTop + clientHeight + 230 - scrollHeight;
      } else {
        this.addBottom = 30;
      }
    },
    //新增卡片
    addCard() {
      this.title = "寫留言";
      this.modal = true;
    },
    //切換視窗
    closeModal() {
      this.modal = false;
      if (this.id == 2) {
        this.view = false;
      }
    },
    //選擇卡片
    selectedCard(e) {
      this.title = "";
      if (e != this.cardSelected) {
        this.cardSelected = e;
        this.modal = true;
        if (this.id == 2) {
          this.view = true;
        }
      } else {
        this.cardSelected = -1;
        this.modal = false;
        if (this.id == 2) {
          this.view = false;
        }
      }
    },
    // getPhoto() {
    //   for (let i = 0; i < this.photo.length; i++) {
    //     this.photoArr.push(this.photo[i].imgurl);
    //   }
    //   console.log(this.photoArr);
    // },
    //切換圖片
    viewSwitch(e) {
      if (e == 0) {
        this.cardSelected--;
      } else {
        this.cardSelected++;
      }
    },
    //前端插入卡片
    newCard(e) {
      console.log(e);
    },
    //加載動畫
    loading() {
      if (this.isOK == -1) {
        this.$nextTick(async () => {
          var params1 = {
            container: document.getElementById("lottile"),
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: loading,
          };
          lottie.loadAnimation(params1);
        });
      }
    },
    getWallCard(id) {
      if (this.page > 0) {
        this.isOK = -1;
        let data = {
          type: id,
          page: 1,
          pagesize: this.pagesize,
          userId: this.user.id,
          label: this.nlabel,
        };
        //console.log(data);
        findWallPageApi(data).then((res) => {
          this.cards = this.cards.concat(res.message);
          //設置下一次的page
          //console.log(res.message);
          if (res.message.length) {
            this.page++;
          } else {
            this.page = 0;
          }
          setTimeout(() => {
            if (this.cards.length > 0) {
              this.isOK = 1;
            } else {
              this.isOK = 0;
            }
          }, 10);
          //如果為圖片將圖片單獨拿出來
          if (this.id == 2) {
            for (let i = 0; i < this.cards.length; i++) {
              this.photoArr.push(this.cards[i].imgurl);
            }
          }
        });
      }
    },
    //點擊打開
    addButtom() {
      this.modal = true;
    },
    getUser() {
      let timer = setInterval(() => {
        if (this.user) {
          clearInterval(timer);
          this.getWallCard(this.id);
        }
      }, 10);
    },
  },
  mounted() {
    this.noteWidth();
    //this.getPhoto();
    this.loading();
    this.getUser();
    //監聽螢幕寬度
    window.addEventListener("resize", this.noteWidth);
    //監聽捲動高度變化
    window.addEventListener("scroll", this.scrollBottpm);
  },
  unmounted() {
    //監聽螢幕寬度
    window.addEventListener("resize", this.noteWidth);
    //監聽捲動高度變化
    window.addEventListener("scroll", this.scrollBottpm);
  },
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
  .label {
    display: flex;
    justify-content: center;
    margin-top: 40px;

    .label-list {
      padding: 0 14px;
      display: flex;
      align-items: center;
      height: 30px;
      margin: @padding-4;
      color: @gray-2;
      box-sizing: border-box;
      cursor: pointer;
    }
    .lbselected {
      color: @gray-1;
      font-weight: 600;
      border: 1px solid @gray-1;
      border-radius: 16px;
    }
  }
  .card {
    display: flex;
    flex-wrap: wrap;
    padding-top: 28px;
    margin: auto;
    .card-inner {
      margin: 6px;
    }
    .cardSelected {
      border: 1px solid @primary-color;
    }
  }
  .photo {
    width: 88%;
    margin: 0 auto;
    columns: 6;
    column-gap: @padding-4; //左右間距
  }
  .photo-card {
    margin-bottom: @padding-4;
    break-inside: avoid;
  }
  .add {
    width: 56px;
    height: 56px;
    background: @gray-1;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.8);
    border-radius: 28px;
    position: fixed;
    right: 30px;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    transform: @tr;
    .icon-tianjia {
      color: @gray-10;
      font-size: 24px;
    }
  }
  .none-msg {
    width: 100%;
    text-align: center;
    padding-top: 20px;
    top: 280px;
    img {
      display: inline;
    }
    p {
      font-family: serif;
      font-weight: 700;
      font-size: 24px;
      color: @gray-3;
    }
  }
  .loading {
    text-align: center;
    width: 100%;
    p {
      //margin-top: 12px;
      font-family: serif;
      font-size: 24px;
      color: @gray-3;
    }
  }
  #lottile {
    height: 200px;
  }
  .bottom-tip {
    text-align: center;
    color: @gray-3;
    padding: 20px;
  }
}
</style>
