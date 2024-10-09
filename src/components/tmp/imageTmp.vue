<template>
  <div style="height: 100%;">
    <template v-if="isEdit">
      <Drag @resize="resize" :data.sync="data">
        {{ tmpId }}
        <img :src="userImg" style="height: 50%;width: 100%;" />
      </Drag>
    </template>
    <template v-else>
      {{ tmpId }}
      <img :src="userImg" style="height: 50%;width: 100%;" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import userImg from '/@/assets/img/20220508204433_a541f.jpg'
import Drag from '/@/components/drag.vue'
const props = defineProps({
  data: {},
  tmpId: {
    type: String,
  },
  isEdit: {
    type: Boolean,
  }
});
const resize = (newRect: any) => {
  emit('resize', newRect, 'imageTmp', props.tmpId)
}
const emit = defineEmits(['resize'])
</script>

<style></style>