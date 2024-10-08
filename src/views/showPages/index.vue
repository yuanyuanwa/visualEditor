<template>
  <div v-bind:style="styleObject" class="scale-box">
    <div class="child" v-for="(item, index) in curPageDataList" :key="item.id" :style="item.style">
      {{ item.id }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import debounce from "lodash/debounce";
import { computed, reactive } from "vue";

import { storeToRefs } from 'pinia';
import { useDesigner } from '/@/stores/designer';
const storesDesigner = useDesigner();
const { designer } = storeToRefs(storesDesigner);

let that: any = reactive({
  width: 1920,
  height: 1080,
  scaleX: null,
  scaleY: null,
});
let styleObject = computed(() => {
  let obj = {
    transform: `scale(${that.scaleX},${that.scaleY}) translate(-50%, -50%)`,
    WebkitTransform: `scale(${that.scaleX},${that.scaleY}) translate(-50%, -50%)`,
    width: that.width + "px",
    height: that.height + "px",
  };
  return obj;
});

const getScale = () => {
  // 分别计算X轴和Y轴的缩放比例
  that.scaleX = window.innerWidth / that.width;
  that.scaleY = window.innerHeight / that.height;
};

const setScale = debounce(() => {
  getScale();
}, 500);

const curPageDataList: any = ref([])
onMounted(() => {
  curPageDataList.value = []
  designer.value.pageDataList.map((item: any) => {
    let data: any = {
      id: item.id,
      style: {
        width: item.style.width * 2 + 'px',
        height: item.style.height * 2 + 'px',
        top: item.style.top * 2 + 'px',
        left: item.style.left * 2 + 'px',
        background: 'pink'
      }
    }
    curPageDataList.value.push(data)
  })
  getScale();
  window.addEventListener("resize", setScale);
});

onUnmounted(() => {
  window.addEventListener("resize", setScale);
});

</script>
<style lang="scss" scoped>
.scale-box {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: 0.3s;
  overflow: hidden;
}

.child {
  position: absolute;
}
</style>