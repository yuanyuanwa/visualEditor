<template>
  <div style="height: 100%;">
    <Drag @resize="resize" :data.sync="data">
      {{ tmpId }}
      <img :src="userImg" style="height: 50%;width: 100%;" />
    </Drag>
  </div>
</template>

<script lang="ts" setup>
import userImg from '/@/assets/img/20220508204433_a541f.jpg'
import Drag from './drag.vue'
const props = defineProps({
  data: {},
  tmpId: {
    type: String,
  }
});
const resize = (newRect: any) => {
  emit('resize', newRect, 'imageTmp', props.tmpId)
}
const emit = defineEmits(['resize'])
</script>

<style></style>