<template>
  <div style="position: relative;height: 100%;">
    <template v-for="(item, index) in view">
      <component :is="item.name" />
    </template>
    <!-- <div class="testDom">

    </div> -->
  </div>
</template>
<script lang="ts">
//画布组件
import aaaa from '../tmp/aaa-a.vue'
import aaab from '../tmp/aaa-b.vue'
export default {
  components: {
    aaaa,
    aaab
  }
}
</script>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const view = ref([
  {
    name: 'aaaa'
  },
  {
    name: 'aaab'
  },
])

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