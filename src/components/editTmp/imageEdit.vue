<template>
    <div>{{ editItem }}</div>

    <UserAvatar  :avatar="'111'"/>

</template>
<script lang="ts" setup>
import UserAvatar from "/@/components/editTmp/uploadImg.vue";
import { ref } from 'vue'
import UploadImg from './uploadImg.vue'
const props = defineProps({
    editItem: {
        type: Object,
    },
});


</script>

<style></style>