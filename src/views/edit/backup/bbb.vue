<template>
    <div class="container" @mousedown="startDrag" @mouseup="stopDrag" @wheel="zoom">
        <div ref="draggable" class="draggable" :style="{ transform: `scale(${scale})` }">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const draggable = ref(null);
let dragging = false;
let startX, startY, offsetX, offsetY;

const startDrag = (event) => {
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    offsetX = startX - draggable.value.offsetLeft;
    offsetY = startY - draggable.value.offsetTop;
    document.addEventListener('mousemove', drag);
};
const scale = ref(1);
const maxScale = ref(3);
const zoom = (event) => {
    event.preventDefault();
    const delta = event.wheelDelta ? event.wheelDelta : -event.deltaY;
    const newScale = delta > 0 ? scale.value * 1.1 : scale.value / 1.1;
    console.log(newScale)
    if (newScale < maxScale.value) {
        scale.value = Math.min(10, Math.max(1, newScale)); // Limit scale
    }
}

const drag = (event) => {
    if (dragging) {
        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;
        const maxX = draggable.value.parentNode.offsetWidth - draggable.value.offsetWidth;
        const maxY = draggable.value.parentNode.offsetHeight - draggable.value.offsetHeight;
        draggable.value.style.left = Math.min(Math.max(0, x), maxX) + 'px';
        draggable.value.style.top = Math.min(Math.max(0, y), maxY) + 'px';
    }
};

const stopDrag = () => {
    dragging = false;
    document.removeEventListener('mousemove', drag);
};
</script>

<style>
.container {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid #000;
    box-sizing: border-box;
}

.draggable {
    position: absolute;
    width: 100px;
    height: 100px;
    cursor: move;
    background-color: pink;
}
</style>