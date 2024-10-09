<template>
  <div style="height: 100%;">
    <template v-if="isEdit">
      <Drag @resize="resize" :data.sync="data">
        标题
      </Drag>
    </template>
    <template v-else>
      标题
    </template>
  </div>
</template>

<script lang="ts" setup>
import userImg from '/@/assets/img/20220508204433_a541f.jpg'
import Drag from '/@/components/drag.vue'
const props: any = defineProps({
  data: {},
  tmpId: {
    type: String,
  },
  isEdit: {
    type: Boolean,
  }
})
const resize = (newRect: any) => {
  emit('resize', newRect, 'titleTmp', props.tmpId)
}
const emit = defineEmits(['resize'])
</script>

<style></style>