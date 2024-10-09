<template>
  <div class="mainLayout">
    <div class="mainLayout-left">
      <div @click="goPage">111</div>组件栏
      <div style="cursor: pointer;">
        <div>
          基本组件：
          <span @click="addDom('imageTmp')">图片</span>、
          <span @click="addDom('titleTmp')">标题</span>、
          <span>方形</span>、
          <span>圆形</span>、
        </div>
        <div>
          表单组件：
          <span>表单1</span>、
          <span>表单2</span>
        </div>
        <div>
          特殊组件：
          <span>wave</span>
        </div>
      </div>
    </div>
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
import { Session } from '/@/utils/storage';

import { storeToRefs } from 'pinia';
import { useDesigner } from '/@/stores/designer';
const storesDesigner = useDesigner();
const { designer } = storeToRefs(storesDesigner);

//画布组件
import CanvasPage from './canvas/index.vue'

const goPage = () => {
  window.open('http://localhost:8866/showPages')
}

const addDom = (type: string) => {
  let data = {
    name: type,
    id: type + Math.floor(Math.random() * 1001),
    style: {
      width: 200,
      height: 200,
      top: 0,
      left: 200
    },
    form: {}
  }
  designer.value.pageDataList.push(data)
  setLocalDesigner()
}

const setLocalDesigner = () => {
  Session.remove('designer');
  Session.set('designer', designer.value);
};

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