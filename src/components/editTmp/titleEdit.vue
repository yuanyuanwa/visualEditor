<template>
  <div>
    <el-input v-model="editItem.ownStyle['z-index']"></el-input>
    <el-input v-model="editItem.ownStyle.background"></el-input>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  editItem: {
    type: Object,
    default: () => {
      return {} 
    }
  },

});


// const resize = (newRect: any) => {
//   emit('resize', newRect, 'imageTmp', props.tmpId)
// }
// const emit = defineEmits(['resize'])
</script>

<style></style>