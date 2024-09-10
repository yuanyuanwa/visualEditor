<template>
    <svg :class="svgClass" class="svg-icon" v-bind="$attrs" :style="{ fill: color,height:`${height}em`,width:`${width}em` }">
      <use :xlink:href="iconName" rel="external nofollow"  />
    </svg>
  </template>
  
  <script setup lang="ts">
  import { computed } from "vue"
  
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: '1'
    },
    height: {
      type: String,
      default: '1'
    }
  })
  
  const iconName = computed(() => `#icon-${props.name}`)
  const svgClass = computed(() => {
    if (props.name) {
       return `svg-icon ${iconName.value}`
    }
    return "svg-icon"
  })
  </script>
  
  <style scoped lang="scss">
  .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    vertical-align: middle;
  }
  </style>