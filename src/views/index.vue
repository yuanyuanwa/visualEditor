<template>
  <div class="mainLayout">
    <div class="mainLayout-left">组件栏</div>
    <div class="mainLayout-center">
      <CanvasPage />
    </div>
    <div class="mainLayout-right">属性栏</div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'

//组件引入
//画布组件
import CanvasPage from '/@/views/canvas/index.vue'
//画布组件
import Aaa from '/@/views/tmp/aaa.vue'
import Bbb from '/@/views/tmp/bbb.vue'


onMounted(() => { })
</script>
<style lang="scss" scoped>
.mainLayout {
  display: flex;
  width: 100%;
  height: 100vh;

  .mainLayout-left {
    width: 20%;
    height: 100%;
    background: rgb(247, 242, 243);
  }

  .mainLayout-center {
    width: 60%;
    height: 100%;
    background: rgb(245, 233, 234);
  }

  .mainLayout-right {
    width: 20%;
    height: 100%;
    background: rgb(246, 228, 231);
  }

}
</style>