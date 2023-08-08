<template>
  <RouterView></RouterView>
  <p class="ab">aaaa</p>
</template>

<script>

export default {
  name: 'App',
  components: {
 
}
}
</script>

<style lang="less">

.ab{
  font-size: @size-16;
  color: @warning-color;
  background: @gray-2;
}
</style>
