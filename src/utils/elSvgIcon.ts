
import type { App } from 'vue';
import * as svg from '@element-plus/icons-vue';


// 引入组件
import SvgIcon from '/@/assets/svgIcon/index.vue'

export function elSvg(app: App) {
	const icons = svg as any;
	for (const i in icons) {
		app.component(`ele-${icons[i].name}`, icons[i]);
	}
	app.component('SvgIcon', SvgIcon);
}

const elSvgIcon = {
	elSvg: (app: App) => {
		elSvg(app);
	},

};

// 统一批量导出
export default elSvgIcon;
