<template>
  <div class="yang-photo-card">
    <img :src="baseUrl + photo.imgurl" class="photo-img" />
    <div class="photo-bg" @click="toDeail"></div>
    <div class="photo-like" @click="clickLike">
      <span
        class="iconfont icon-aixin1"
        :class="{ islike: card.islike[0].count > 0 }"
      ></span>
      <span class="like-data">{{ photo.like[0].count }}</span>
    </div>
  </div>
</template>
<script>
import { label, cardColor } from "@/utils/data";
import { baseUrl } from "@/utils/env";
import { insertFeedbackApi } from "@/api/index";
export default {
  data() {
    return {
      label,
      cardColor,
      baseUrl,
      user: this.$store.state.user,
    };
  },
  props: {
    photo: {
      default: {},
    },
  },
  computed: {
    card() {
      return this.photo;
    },
  },
  methods: {
    // 顯示詳情
    toDeail() {
      this.$emit("toDetail");
    },
    //按讚
    clickLike() {
      if (this.card.islike[0].count == 0) {
        let data = {
          wallId: this.card.id,
          userId: this.user.id,
          type: 0, //0是喜歡
          moment: new Date(),
        };
        insertFeedbackApi(data).then(() => {
          //反饋完成
          this.card.like[0].count++;
          this.card.islike[0].count++;
        });
      }
    },
  },
  created() {
    //console.log(this.card)
  },
};
</script>
<style scoped lang="less">
.yang-photo-card {
  position: relative;
  .photo-img {
    width: 100%;
  }
  .photo-bg {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: @tr;
    cursor: pointer;
  }
  .photo-like {
    position: absolute;
    left: @padding-8;
    top: @padding-8;
    background: @gray-10;
    border-radius: 20px;
    height: 28px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    backdrop-filter: blur(10px);
    opacity: 0;
    transition: @tr;
    cursor: pointer;

    .icon-aixin1 {
      color: @gray-3;
      padding-right: @padding-4;
    }
    .like-data {
      color: @gray-1;
    }
  }
  &:hover {
    .photo-bg {
      opacity: 1;
    }
    .islike {
      color: @like;
    }
    .photo-like {
      opacity: 1;
    }
  }
}
</style>
