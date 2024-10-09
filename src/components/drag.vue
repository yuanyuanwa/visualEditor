<template>
  <div style="width: 100%;height: 100%;">
    <VueDragResize key="keys" :style="{ 'z-index': zindex }" :parentLimitation="true" :isActive="isActive"
      :w="Number(props.data.width)" :h="Number(props.data.height)" :y="Number(props.data.top)"
      :x="Number(props.data.left)" v-on:resizing="resize" v-on:dragging="resize">
      <slot></slot>
    </VueDragResize>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import VueDragResize from 'vue-drag-resize/src'
// const width = ref()
// const height = ref()
// const top = ref()
// const left = ref()
const props: any = defineProps({
  data: {},
  zindex: {},
  isActive: {}
})
const resize = (newRect: any) => {
  props.data.width = newRect.width;
  props.data.height = newRect.height;
  props.data.top = newRect.top;
  props.data.left = newRect.left
  // width.value = newRect.width;
  // height.value = newRect.height;
  // top.value = newRect.top;
  // left.value = newRect.left;
  emit('resize', newRect)
}

const emit = defineEmits(['resize'])
</script>

<style lang="scss" scoped>
:deep(.vdr-stick) {
  background: skyblue;
  border-radius: 50%;
}
</style>