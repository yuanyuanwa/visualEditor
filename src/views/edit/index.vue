<template>
  <div class="mainLayout">
    <div class="mainLayout-left">组件栏</div>
    <div class="mainLayout-center">
      <v3-drag-zoom-container :autoResize="false" :minZoom="0.8">
        <div style="width: 960px;height: 540px;background: white;">
          <CanvasPage />
        </div>
      </v3-drag-zoom-container>
    </div>
    <div class="mainLayout-right">属性栏</div>
  </div>
</template>
<script lang="ts" setup>
import { V3DragZoomContainer } from "v3-drag-zoom";
import { onMounted } from 'vue'

//组件引入
//画布组件
import CanvasPage from './canvas/index.vue'


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