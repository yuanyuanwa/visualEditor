<template>
  <div style="width: 100%;height: 100%;">
    <VueDragResize key="123" :parentLimitation="true" :isActive="true" :w="props.data.width" :h="props.data.height" :y="props.data.top" :x="props.data.left"  v-on:resizing="resize"
      v-on:dragging="resize">
      <slot></slot>
    </VueDragResize>
  </div>
</template>

<script lang="ts" setup>
import VueDragResize from 'vue-drag-resize/src'
const props:any= defineProps({
  data:{}
})
const resize = (newRect: any) => {
  props.data.width = newRect.width;
  props.data.height = newRect.height;
  props.data.top = newRect.top;
  props.data.left = newRect.left
}

const emit=defineEmits(['resize'])
</script>

<style lang="scss" scoped>
:deep(.vdr-stick) {
  background: skyblue;
  border-radius: 50%;
}
</style>