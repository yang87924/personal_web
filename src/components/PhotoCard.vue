<template>
  <div class="yang-photo-card">
    <img :src="require('../../static/'+photo.imgurl+'.webp')" class="photo-img"/>
    <div class="photo-bg"></div>
    <div class="photo-like">
      <span class="iconfont icon-aixin1"></span>
      <span class="like-data">{{photo.like}}</span>
    </div>
  </div>
</template>
<script >
import { label,cardColor } from "@/utils/data";
export default {
  data(){
    return{
      label,
      cardColor,
    }
  },
  props:{
    photo:{
      default: {},
    }
  },
  computed:{
    card(){
      return this.note;
    }
  },
  created() {
    // console.log(this.card)
  }
}
</script>
<style scoped lang="less">
.yang-photo-card{
  position: relative;
  .photo-img{
    width: 100%;
  }
  .photo-bg{
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.2);
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .photo-like{
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

    .icon-aixin1{
      color: @gray-3;
      padding-right: @padding-4;
    }
    .like-data{
      color:@gray-1;
    }
  }
  &:hover{
    .photo-bg{
      opacity: 1;
    }
    .photo-like{
      opacity: 1;
    }
  }
}
</style>