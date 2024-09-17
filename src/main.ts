import { createApp } from 'vue'
import './style.css'//全局样式
import pinia from '/@/stores/index';
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhLocale from "element-plus/es/locale/lang/zh-cn";
import '/@/theme/index.scss';
import router from './router'
import elSvgIcon from './utils/elSvgIcon';

import VConsole from 'vconsole';
import svgIcon from './components/SvgIcon.vue'
// import VueDragResize from 'vue-drag-resize'



// const vConsole = new VConsole();

const app = createApp(App)
app.component('svg-icon',svgIcon)
// app.component('vue-drag-resize', VueDragResize)


elSvgIcon.elSvg(app);

app.use(pinia).use(router).use(ElementPlus, { locale: zhLocale }).mount('#app')
