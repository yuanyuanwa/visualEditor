<template>
  <!-- <div>{{ editItem }}</div> -->

  <UserAvatar :avatar="'111'" />
  <!-- <clipperDialog ref="clipperRef" :type="clipperData.type" :allow-type-list="clipperData.allowTypeList"
    :limit-size="clipperData.limitSize" :fixed-number="clipperData.fixedNumber"
    :fixed-number-aider="clipperData.fixedNumberAider" :preview-width="clipperData.previewWidth" @confirm="onConfirm" /> -->

</template>
<script lang="ts" setup>
import clipperDialog from '/@/components/editTmp/uploadImg2.vue'
import UserAvatar from "/@/components/editTmp/uploadImg.vue";
import { ref } from 'vue'
import UploadImg from './uploadImg.vue'
const props = defineProps({
  editItem: {
    type: Object,
  },
});
interface IClipper {
  type: string // 上传类型
  allowTypeList: string[] // 接收允许上传的图片类型
  limitSize: number // 限制大小
  fixedNumber: number[] // 截图框的宽高比例
  fixedNumberAider?: number[] // 侧边栏收起截图框的宽高比例
  previewWidth: number // 预览宽度
  previewWidthAider?: number // 侧边栏收起预览宽度
}

const clipperData = ref<IClipper>({
  type: '',
  allowTypeList: [],
  limitSize: 1,
  fixedNumber: [],
  previewWidth: 0
})
/* 浏览器logo上传 */
const browserUpload = (): void => {
  clipperData.value = {
    type: 'browserLogo', // 该参数可根据实际要求修改类型
    allowTypeList: ['png', 'jpg', 'jpeg', 'peeee'], // 允许上传的图片格式
    limitSize: 1, // 限制的大小
    fixedNumber: [1, 1],  // 截图比例，可根据实际情况进行修改
    previewWidth: 100 // 预览宽度
  }
  // 打开裁剪组件
  clipperRef.value.uploadFile()
}

/* 保存logo自定义事件, 实际业务在此编写 */
const onConfirm = (val: any): void => {
  console.log(val, '点击保存按钮后的图片信息')
}



</script>

<style></style>