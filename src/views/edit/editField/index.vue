<template>
  <div>
    {{ designer }}
    <component :is="getComponent(designer.editItem)" :editItem="designer.editItem" :isEdit="true" />
  </div>
</template>
<script lang="ts">
import imageEdit from '/@/components/editTmp/imageEdit.vue'
import titleEdit from '/@/components/editTmp/titleEdit.vue'

import { storeToRefs } from 'pinia';
import { useDesigner } from '/@/stores/designer';
const storesDesigner = useDesigner();
const { designer } = storeToRefs(storesDesigner);

export default {
  components: {
    imageEdit,
    titleEdit,
  }
}
</script>
<script lang="ts" setup>

//获取到正在编辑的组件对应的编辑组件
const getComponent = (editItem: any) => {
  if (editItem && editItem.name) {
    return editItem.name.split('-')[0] + '-edit'
  }
}



</script>
<style lang="scss" scoped></style>