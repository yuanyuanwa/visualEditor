<template>
  <div class="container" @mousedown="startDrag" @wheel="zoom">
    <div
      class="draggable"
      :style="{ transform: `translate(${x}px, ${y}px) scale(${scale})` }"
      @mousedown.stop.prevent="startDrag"
    >
      <slot></slot>
    </div>
  </div>
</template>
 
<script>
import { ref } from 'vue';
 
export default {
  setup() {
    const x = ref(50);
    const y = ref(50);
    const scale = ref(1);
    let dragging = false;
 
    function startDrag(event) {
      dragging = true;
      const startX = event.clientX - parseInt(x.value);
      const startY = event.clientY - parseInt(y.value);
 
      function move(event) {
        if (dragging) {
          x.value = event.clientX - startX;
          y.value = event.clientY - startY;
        }
      }
 
      function up() {
        dragging = false;
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      }
 
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    }
 
    function zoom(event) {
      event.preventDefault();
      const delta = event.wheelDelta ? event.wheelDelta : -event.deltaY;
      const newScale = delta > 0 ? scale.value * 1.1 : scale.value / 1.1;
      scale.value = Math.min(10, Math.max(1, newScale)); // Limit scale
    }
 
    return { x, y, scale, startDrag, zoom };
  },
};
</script>
 
<style>
.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
 
.draggable {
  width: 200px;
  height: 200px;
  background-color: #3498db;
  color: white;
  position: absolute;
  cursor: move;
  transition: transform 0.1s;
}
</style>