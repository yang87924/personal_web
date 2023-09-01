<template>
  <div class="new-card">
    <div class="card-color">
      <div class="colors" v-show="id == 1">
        <p
          class="color-li"
          v-for="(e, index) in cardColor1"
          :key="index"
          :style="{ background: e }"
          :class="{ colorSelected: index == colorSelected }"
          @click="changeColor(index)"
        ></p>
      </div>
    </div>
    <!-- 照片 -->
    <div class="add-photo" v-if="id == 2">
      <input
        type="file"
        name="file"
        id="file"
        nultiple="nultiple"
        @change="showPhoto"
      />
      <div class="add-bt" v-if="url == ''">
        <span class="iconfont icon-tianjia"></span>
      </div>
      <div class="change-bt" v-if="url != ''">
        <span class="iconfont icon-tianjia"></span>
      </div>
      <div class="photo-div"><img :src="url" /></div>
    </div>
    <!-- 卡片 -->
    <div
      class="card-main"
      :style="{ background: id == 1 ? cardColor[colorSelected] : cardColor[5] }"
    >
      <textarea
        placeholder="留言..."
        class="message"
        maxlength="96"
        v-model="message"
      ></textarea>
      <input type="text" placeholder="簽名" class="name" v-model="name" />
    </div>
    <div class="labels">
      <p class="title">選擇標籤</p>
      <div class="label">
        <p
          v-for="(e, index) in label[id]"
          :key="index"
          class="label-li"
          :class="{ labelSelected: index == labelSelected }"
          @click="changeLabel(index)"
        >
          {{ e }}
        </p>
      </div>
    </div>
    <div>
      <p class="title">留言注意事項</p>
      <p class="mzsm">
        1.禁止不雅言詞和冒犯性語言：
        請確保您的留言內容不含任何冒犯、歧視或不雅的言詞，以維護友好和諧的交流環境。<br />

        2.尊重他人觀點：
        即使您不同意對方的觀點，也請以尊重和理性的方式進行討論，避免進行攻擊性的言論。<br />

        3.保持主題相關： 留言應與討論主題相關，避免偏離話題或灌水。<br />

        4.避免洩露個人信息：
        請不要在留言中分享您或他人的個人隱私信息，以保護隱私安全。<br />

        5.不得散佈虛假信息：
        請確保您的留言內容基於事實，避免散佈虛假或誤導性的信息。<br />

        <!--      6.避免侵犯版權： 如果引用他人作品，請確保您有合法的授權或引用權限，以避免侵犯版權。<br/>-->

        <!--      7.尊重社群準則： 如果您在特定平台或社群進行留言，請遵守該平台的社群準則和規定。<br/>-->

        <!--      8.避免過度宣傳： 請不要在留言中進行商業宣傳或過度推銷，以免影響交流氛圍。<br/>-->

        <!--      9.文明交流： 請保持文明的交流方式，避免使用攻擊性的言辭或造成不必要的爭執。<br/>-->

        <!--      10.審慎使用幽默： 幽默是交流的一種方式，但請注意您的幽默是否適合當前的情境，避免引起誤解或冒犯。<br/>-->
      </p>
    </div>
    <div class="footbt">
      <yangButton size="max" nom="secondary" @click="colseModal(0)"
        >取消</yangButton
      >
      <yangButton size="max" class="submit" @click="sumit()">確定</yangButton>
    </div>
  </div>
</template>
<script>
import { cardColor, cardColor1, label } from "@/utils/data";
import yangButton from "./YangButton.vue";
import { getObjectURL } from "@/utils/YangFunction";
export default {
  data() {
    return {
      cardColor,
      cardColor1,
      label,
      colorSelected: 0, //當前選擇顏色
      labelSelected: 0, //當前選擇標籤
      message: "", //留言訊息
      name: "", //簽名
      user: this.$store.state.user,
      url: "",
    };
  },
  props: {
    id: {
      default: 0,
    },
  },
  components: {
    yangButton,
  },
  methods: {
    changeColor(e) {
      this.colorSelected = e;
    },
    //切換標籤
    changeLabel(e) {
      this.labelSelected = e;
    },
    //關閉視窗
    colseModal(data) {
      this.$emit("addClose", data);
    },
    //提交新增wall
    sumit() {
      let name = "匿名";
      if (this.name) {
        name = this.name;
      }
      let data = {
        type: this.id,
        message: this.message,
        name: name,
        userId: this.user.id,
        moment: new Date(),
        label: this.nowlabel,
        color: 5,
        imgurl: "",
      };
      console.log(data);
    },
    //顯示圖片
    showPhoto() {
      const file = document.getElementById("file").files[0];
      if (file) {
        let aa = getObjectURL(file);
        this.url = aa;
      } else {
        console.error("No file selected");
      }
    },

    //街口測試使用
    apiTest() {
      let data = {
        type: 0,
        message: "測試使用",
        name: "yamg",
        userId: 32,
        moment: new Date(),
        label: 0,
        color: 3,
        imgurl: "https.connectu.life",
      };
      this.axios.post("http://localhost:3000/insertwall", data).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped lang="less">
.new-card {
  padding: 0 @padding-20 100px;
  position: relative;
  .colors {
    padding-bottom: @padding-12;
    display: flex;
    align-items: center;
    .color-li {
      width: 24px;
      height: 24px;
      margin-right: @padding-8;
      cursor: pointer;
    }
    .colorSelected {
      border: 1px solid @primary-color;
    }
  }
  .card-main {
    height: 240px;
    width: 100%;
    transition: @tr;
    padding: @padding-12;
    box-sizing: border-box;
    .message {
      background: none;
      border: none;
      resize: none;
      height: 172px;
      width: 100%;
      padding: @padding-8;
      box-sizing: border-box;
      font-family: fa;
      font-size: 15px;
    }
    .name {
      width: 100%;
      box-sizing: border-box;
      padding: @padding-8;
      background: none;
      border: #fff 1px solid;
      line-height: 20px;
      font-family: fa;
      font-size: 15px;
    }
  }
  .title {
    color: @gray-1;
    font-weight: 600;
    padding-top: 30px;
  }
  .label {
    display: flex;
    flex-wrap: wrap;
    width: 320px;
    .label-li {
      padding: 2px 10px;
      border-radius: 20px;
      margin: 16px @padding-4 0 0;
      cursor: pointer;
      color: @gray-2;
      transition: @tr;
    }
    .labelSelected {
      background: #ebebeb;
      font-weight: 600;
      color: @gray-1;
    }
  }
  .mzsm {
    padding-top: 10px;
    font-size: 12px;
    color: @gray-3;
  }
  .add-photo {
    padding-bottom: 20px;
    position: relative;

    #file {
      position: absolute;
      z-index: 10;
      top: -10px;
      height: 74px;
      width: 64px;
      opacity: 0;
      cursor: pointer;
    }
    .add-bt {
      width: 64px;
      height: 64px;
      margin-bottom: 2px;
      border: 1px solid @gray-3;
      border-radius: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .icon-tianjia {
      font-size: 24px;
    }
  }
  .photo-div {
    max-height: 200px;
    width: 100%;
    background: #f0f0f0;
    overflow: hidden;
    display: flex;
    align-items: center;
    img {
      width: 100%;
    }
  }
  .change-bt {
    position: absolute;
    top: 12px;
    left: 12px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-xiugai {
      font-size: 12px;
      color: #fff;
    }
  }
  .footbt {
    padding: @padding-20;
    box-sizing: border-box;
    position: fixed;
    bottom: 52px;
    left: 0;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.6);
    width: 100%;
    .submit {
      margin-left: @padding-20;
      width: 200px;
    }
  }
}
</style>
