<template>
  <div style="height: 100%;">
    <template v-if="isEdit">
      <Drag @resize="resize" :data.sync="data.style" :zindex="data.ownStyle['z-index']" :isActive="designer.editItem.id===data.id">
        <div  @click="selectComponent(data)" :style="data.ownStyle" style="width: 100%;height: 100%;cursor: pointer;">
          <img :src="userImg" style="height: 100%;width: 100%;" />
        </div>
      </Drag>
    </template>
    <template v-else>
      <div :style="data.ownStyle" style="width: 100%;height: 100%;" >
        <img :src="userImg" style="height: 100%;width: 100%;" />
      </div>
    </template>
  </div>
</template>
<script lang="ts" name="aaa" setup>
import userImg from '/@/assets/img/20220508204433_a541f.jpg'
import Drag from '/@/components/drag.vue'
import { storeToRefs } from 'pinia';
import { useDesigner } from '/@/stores/designer';
const storesDesigner = useDesigner();
const { designer } = storeToRefs(storesDesigner);
const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
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
const selectComponent = (data: any) => {
  emit('selectComponent', data)
}
const emit = defineEmits(['resize','selectComponent'])
</script>

<style></style>