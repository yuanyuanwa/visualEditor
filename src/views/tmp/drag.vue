<template>
  <div style="width: 100%;height: 100%;">
    <VueDragResize key="123" :parentLimitation="true" :isActive="true" :w="data.w" :h="data.h" v-on:resizing="resize"
      v-on:dragging="resize">
      <!-- <div style="height: 100%;width: 100%;background: skyblue;">
        <h3>Hello World!</h3>
        <p>{{ top }} х {{ left }} </p>
        <p>{{ width }} х {{ height }}</p>
        <img :src="userImg" style="height: 50%;width: 100%;"/>
      </div> -->
      <slot></slot>
    </VueDragResize>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import VueDragResize from 'vue-drag-resize/src'
import userImg from '/@/assets/img/20220508204433_a541f.jpg'
const width = ref()
const height = ref()
const top = ref()
const left = ref()
const props = defineProps({
  data:{}
})
const resize = (newRect: any) => {
  props.data.width = newRect.width;
  props.data.height = newRect.hegit;
  props.data.top = newRect.top;
  props.data.left = newRect.left
  width.value = newRect.width;
  height.value = newRect.height;
  top.value = newRect.top;
  left.value = newRect.left;
  emit('resize',newRect)
}

const emit=defineEmits(['resize'])
</script>

<style lang="scss" scoped>
:deep(.vdr-stick) {
  background: skyblue;
  border-radius: 50%;
}
</style>