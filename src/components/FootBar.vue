<template>
  <div class="foot-bar">
    <div class="foot-bar-inner">
      <div class="foot-left">
        <div class="logo">
          <img
            src="@/assets/images/blue-textured-leaves.svg"
            class="logo-img"
          />
          <p class="logo-name">yang</p>
        </div>
        <p class="top-p">yang留言板，方便與用戶交流的留言平台</p>
        <!-- <p class="top-p">yang留言板，方便與用戶交流的留言平台</p> -->
        <p class="state"><span>聲明</span><span>yang版權所有</span></p>
      </div>
      <div class="link">
        <p class="title">鏈結</p>
        <div class="line-inner">
          <a href="https://connectu.life/" target="_blank" class="link-name">ConnectU 綜合論壇</a>
          <a href="https://github.com/yang87924" target="_blank" class="link-name">Github</a
          >
        </div>
      </div>
      <div class="foot-right">
        <p class="title">Donate</p>
        <div class="right-inner">
          <div>
            <img src="@/assets/images/Snipaste_2023-08-19_18-47-07.png" />
            <p class="ds-title">Line pay</p>
          </div>
          <div>
            <img src="@/assets/images/Snipaste_2023-08-20_13-35-37.png" />
            <p class="ds-title">街口支付</p>
          </div>
          <div>
            <img src="@/assets/images/Snipaste_2023-08-20_13-39-16.png" />
            <p class="ds-title">支付寶</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.foot-bar {
  width: 100%;
  height: 200px;
  background: @gray-1;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 40px;
  .foot-bar-inner {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    p {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  .foot-left {
    .logo {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
      .logo-name {
        font-size: 20px;
        color: @gray-10;
        font-weight: 600;
        padding-left: 10px;
      }
    }
    .top-p {
      font-size: @size-12;
      padding-bottom: 4px;
      width: 400px;
    }
    .state {
      font-size: @size-12;
      padding-top: 26px;
      span {
        padding-right: 20px;
      }
    }
  }
  .title {
    font-size: @size-16;
    padding-bottom: 12px;
  }
  .link {
    padding: 0 40px;
    flex: 1;
    .line-inner{
      margin-bottom: 10px; /* 为链接添加一些底部间距 */
        a{
            color: rgba(255, 255, 255, 0.5);
            padding-right: 20px;
            display: block; /* 强制链接以块级元素显示 */
        }
    }
  }
  .foot-right{
    .right-inner{
        display: flex;
        img{
            width: 100px;
            padding-right: 40px;
        }
        .ds-title{
            font-size: @size-12;
            padding-top: 8px;
        }
    }
  }
}
</style>
