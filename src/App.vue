<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick, } from 'vue';
import { useThemeConfig } from '/@/stores/themeConfig';
import { useDesigner } from '/@/stores/designer';
import { Session } from '/@/utils/storage';
const storesThemeConfig = useThemeConfig();
const storesDesigner = useDesigner();
import { checkAppNewVersion } from '/@/router/index'

onMounted(() => {
  nextTick(() => {
    if (Session.get('themeConfig')) {
      storesThemeConfig.setThemeConfig({ themeConfig: Session.get('themeConfig') });
    }
    if (Session.get('designer')) {
      storesDesigner.setThemeConfig({ designer: Session.get('designer') });
    }
    // 监听页面打开显示
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) {
        checkAppNewVersion()
      }
    })
  });

})

</script>
<style lang='scss'>
//弹窗相对于屏幕居中
.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
</style>
