<template>
  <div class="top-bar">
    <div class="logo">
      <img src="@/assets/images/blue-textured-leaves.svg" class="logo-img" />
      <p class="logo-name">yang</p>
    </div>
    <div class="menu">
      <YangButton nom="cprimary" class="menu-message">留言牆</YangButton>
      <YangButton nom="csecondary" class="menu-photo">照片牆</YangButton>
    </div>
    <div class="user">
      <div class="user-head"></div>
    </div>
  </div>
</template>

<script>
import YangButton from "./YangButton.vue";
export default {
  data() {
    return {};
  },
  components: {
    YangButton,
  },
};
</script>

<style lang="less">
.top-bar {
  width: 100%;
  height: 52px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;
  .logo {
    display: flex;
    align-items: center;
    width: 200px;
    .logo-name {
      font-size: 20px;
      color: @gray-1;
      font-weight: 600;
      padding-left: 10px;
    }
  }
  .menu {
    .menu-message {
      margin-right: 24px;
    }
  }
  .user {
    width: 200px;
    .user-head {
      float: right;
      border-radius: 50%;
      height: 36px;
      width: 36px;
      background-image: linear-gradient(180deg, #7be7ff 2%, #1e85e2);
    }
  }
}
</style>
