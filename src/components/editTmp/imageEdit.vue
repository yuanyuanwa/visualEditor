<template>
    <div>{{ editItem }}</div>
</template>
<script lang="ts" name="aaa" setup>
const props = defineProps({
    editItem: {
        type: Object,
    },

});
// const resize = (newRect: any) => {
//   emit('resize', newRect, 'imageTmp', props.tmpId)
// }
// const emit = defineEmits(['resize'])
</script>

<style></style>