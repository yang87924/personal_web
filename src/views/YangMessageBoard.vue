<template>
  <div>
    <p class="title">index</p>
    <p class="bb">index</p>
  </div>
</template>

<script>
//import axios from 'axios';
export default {
  data() {
    return {
      aaa: "",
    };
  },
  componets: {
    //組件
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
.title {
  font-size: 24px;
}
</style>
