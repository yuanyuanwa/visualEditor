<template>
  <div style="height: 100%;">
    <Drag @resize="resize" :data.sync="data"> {{ data }}
      <img :src="userImg" style="height: 50%;width: 100%;" />
    </Drag>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import userImg from '/@/assets/img/20220508204433_a541f.jpg'
import Drag from './drag.vue'
let data = reactive({
  width: 200,
  height: 200,
  top: 0,
  left: 200
})
const resize = (newRect: any) => {
  console.log(1111, newRect)
}
</script>

<style></style>