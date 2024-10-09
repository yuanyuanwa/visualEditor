<template>
  <div style="position: relative;height: 100%;">
    <template v-for="(item, index) in designer.pageDataList">
      <component :is="item.name" @resize="resize" :data="item.style" :tmpId="item.id" :isEdit="true"/>
    </template>
  </div>
</template>
<script lang="ts">
//画布组件
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
    titleTmp
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
  // let flag = false
  designer.value.pageDataList.map((item: any, index: any) => {
    if (item.id === id) {
      // flag = true
      item.style = {
        width: newRect.width,
        height: newRect.height,
        top: newRect.top,
        left: newRect.left,
      }
      return item
    }
  })
  // if (!flag) {
  //   let data = {
  //     id: id,
  //     name: name,
  //     style: {
  //       width: newRect.width,
  //       height: newRect.height,
  //       top: newRect.top,
  //       left: newRect.left,
  //     }
  //   }
  //   designer.value.pageDataList.push(data)
  // }
  setLocalDesigner()
}

const setLocalDesigner = () => {
  Session.remove('designer');
  Session.set('designer', designer.value);
};

onMounted(() => { })
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