<template>
  <div style="height: 90vh;" class="flex-center">
    <div style="width: 500px;">
      <img src="/@/assets/images/svg/404.svg" style="width:100%;height: 300px;">
      <div style="color: #3789ee;text-align: center;">对不起，您要的页面走丢啦，请点击<span class="link"
          @click="goBackHome">这里</span>返回首页</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const goBackHome = () => {
  router.push('/')
}
</script>
<style lang="scss" scoped>
.link {
  cursor: pointer;
  font-family: myFontBold;
  display: inline-block;
  padding: 0px 3px;
  border-bottom: 1px solid #3789ee;
}

.link:hover {
  color: #6ba6ee;
  border-bottom: 1px solid #6ba6ee;
}
</style>