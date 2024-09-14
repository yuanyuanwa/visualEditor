<template>
    <div>
        <div style="overflow: hidden;" ref="dragContainer" class="draggable" :style="style">
            {{ state }} 拖动我
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, computed } from 'vue';

const dragContainer: any = ref(null);
const state = reactive({
    dragging: false,
    offset: { x: 0, y: 0 },
    position: { x: 0, y: 0 }
});

const style = computed(() => ({
    transform: `translate(${state.position.x}px, ${state.position.y}px)`
}));

const startDrag = (event: any) => {
    state.dragging = true;
    state.offset.x = event.clientX - state.position.x;
    state.offset.y = event.clientY - state.position.y;
};

const drag = (event: any) => {
    if (state.dragging) {
        state.position.x = event.clientX - state.offset.x;
        state.position.y = event.clientY - state.offset.y;
        console.log(1111, state.position.x, state.position.y)
    }
};

const stopDrag = () => {
    state.dragging = false;
};

onMounted(() => {
    dragContainer.value.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', stopDrag);
});

onBeforeUnmount(() => {
    dragContainer.value.removeEventListener('mousedown', startDrag);
    window.removeEventListener('mousemove', drag);
    window.removeEventListener('mouseup', stopDrag);
});
</script>

<style scoped>
.draggable {
    /* position: absolute; */
    cursor: pointer;
    /* user-select: none; */
}
</style>