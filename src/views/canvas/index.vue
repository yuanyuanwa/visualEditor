<template>
    <div style="position: relative;height: 100%;">
        <template v-for="(item, index) in view">
            <component :is="item.name" />
        </template>
        <!-- <component :is="aA" />
        <a-A/> -->
    </div>
</template>
<script lang="ts">

//画布组件
import aA from '/@/views/tmp/aaa.vue'
import bB from '/@/views/tmp/bbb.vue'
import aaaa from '/@/views/tmp/aaa-a.vue'

export default {
    components: {
        aA,
        bB,
        aaaa
    }
}
</script>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'


const view = ref([
    // {
    //     name: 'a-A'
    // },
    // {
    //     name: 'b-B'
    // },
    {
        name: 'aaaa'
    },
])



onMounted(() => { })
</script>