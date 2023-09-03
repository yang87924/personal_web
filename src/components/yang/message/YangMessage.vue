<template>
  <Transition name="down">
    <div class="yang-message" v-if="isShow">
      <div class="yang-m-i">
        <i class="iconfont" :class="style[type].icon"></i>
        <span class="text">{{ message }}</span>
      </div>
    </div>
  </Transition>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "yangMessage",
  props: {
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      // warn警告 error錯誤success成功
      default: "warn",
    },
  },
  setup() {
    const style = {
      warning: {
        icon: "icon-warning",
      },
      error: {
        icon: "icon-error",
      },
      success: {
        icon: "icon-success",
      },
    };
    //定義一個數據控制顯示隱藏，默認是隱藏掛載完畢顯示
    const isShow = ref(true);

    onMounted(() => {
      //需調用鉤子函數，等dom泫然完成後，再進行賦值，如果再setup中直接賦值，則會直接被渲染
      isShow.value = true;
      setTimeout(() => {
        isShow.value = false;
      }, 3000);
    });
    return {
      style,
      isShow, // 將 isShow 添加到返回的對象中
    };
  },
};
</script>

<style lang="less" scoped>
.down {
  &-enter {
    &-from {
      transform: translateY(-30%);
      opacity: 0;
    }
    &-active {
      transition: all 0.3s;
    }
    &-to {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  &-leave {
    &-from {
      transform: translateY(0px);
      opacity: 1;
    }
    &-active {
      transition: all 0.3s;
    }
    &-to {
      transform: translateY(-30px);
      opacity: 0;
    }
  }
}
.yang-message {
  width: 100%;
  height: 40px;
  position: fixed;
  z-index: 9999;
  top: 20px;
  line-height: 40px;
  display: flex;
  justify-content: center;

  .yang-m-i {
    padding: 0 20px;
    color: @gray-1;
    border-radius: 12px;
    background: @gray-10;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  i {
    margin-right: 6px;
    vertical-align: middle;
  }

  .text {
    vertical-align: middle;
  }
}
.icon-success {
  color: @primary-color;
}
.icon-warning {
  color: @warning-color;
}
.icon-error {
  color: @error-color;
}
</style>
