<template>
  <div style="height: 100%;">
    <!-- <bbb>
            1111
        </bbb> -->
       
    <Drag @resize="resize" :data.sync="data"> {{ data }}
      <img :src="userImg" style="height: 50%;width: 100%;"/>
    </Drag>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import aaa from './aaa.vue'
import bbb from './bbb.vue'
import userImg from '/@/assets/img/20220508204433_a541f.jpg'
import Drag from './drag.vue'
let data = reactive({
  w:200,
  h:200,
  width:null,
  height:null,
  top:null,
  left:null
})
const resize=(newRect:any)=>{
  console.log(1111,newRect)
}
</script>

<style></style>