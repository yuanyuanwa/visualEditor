import { defineStore } from 'pinia';

export const useThemeConfig = defineStore('themeConfig', {
	state: (): ThemeConfigState => ({
		themeConfig: {			
			pageType:'',//页面类型
			isCollapse: false,// 是否开启菜单水平折叠效果
			isEditBox:'tmp',//是否展开编辑工具
			activeTmpID:'',//选中的模版id
		},
	}),
	actions: {
		setThemeConfig(data: ThemeConfigState) {
			this.themeConfig = data.themeConfig;
		},
	},
});
