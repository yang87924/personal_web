<template>
  <div class="wall-index">
    <top-bar></top-bar>
    <video src="@/assets/images/qm1.mp4" autoplay="autoplay" muted="nuted" loop="loop" class="bg-video" ></video>
    <RouterView></RouterView>
    <FootBar></FootBar>
  </div>
</template>

<script>
import topBar from "@/components/TopBar.vue";
import FootBar from "@/components/FootBar.vue";
export default {
  data() {
    return {
      aaa: "",
    };
  },
  components: {
    //組件
    topBar,
    FootBar,
  },
  computed: {},
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.axios
        .post("http://182.61.20.123:3001/singin/match", {
          data: "aaa",
          pwd: "bbb",
        })
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.wall-index{
  .bg-video{
    height:"800";
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1 ;
    height: 880px;
  }
}
</style>
