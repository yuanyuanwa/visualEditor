<template>
  <div style="position: relative;height: 100%;">
    <template v-for="(item, index) in designer.pageDataList">
      <component @selectComponent="selectComponent" :is="item.name" @resize="resize" :data="item" :tmpId="item.id"
        :isEdit="true" />
    </template>
  </div>
</template>
<script lang="ts">
//画布组件
import customComponents from '/@/components/tmp/index'
import imageTmp from '/@/components/tmp/imageTmp.vue'
import titleTmp from '/@/components/tmp/titleTmp.vue'
import { useDebounce } from '/@/utils/method';

import { storeToRefs } from 'pinia';
import { useDesigner } from '/@/stores/designer';
const storesDesigner = useDesigner();
const { designer } = storeToRefs(storesDesigner);

export default {
  components: {
    imageTmp,
    titleTmp,
  }
}
</script>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Session } from '/@/utils/storage';

const view = ref([
  {
    name: 'imageTmp'
  },
  {
    name: 'titleTmp'
  },
])
const resize = useDebounce((newRect: any, name: any, id: any) => {
  changePageDataList(newRect, name, id)
}, 300)

const changePageDataList = (newRect: any, name: any, id: any) => {
  designer.value.pageDataList.map((item: any, index: any) => {
    if (item.id === id) {
      item.style = {
        width: newRect.width,
        height: newRect.height,
        top: newRect.top,
        left: newRect.left,
      }
      return item
    }
  })
  // setLocalDesigner()
}

const selectComponent = (itemData: any) => {
  designer.value.pageDataList.map((item: any, index: any) => {
    if (item.id === itemData.id) {
      designer.value.editItem = item
    }
  })
  setLocalDesigner()
}

const setLocalDesigner = () => {
  Session.remove('designer');
  Session.set('designer', designer.value);
};

storesDesigner.$subscribe((mutate, state) => {
  setLocalDesigner()
})
</script>
<style lang="scss" scoped>
.testDom {
  position: absolute;
  top: 200px;
  left: 0px;
  width: 200px;
  height: 200px;
  background: skyblue;
}
</style>