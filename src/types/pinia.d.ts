/**
 * pinia 类型定义
 */
declare interface TagsViewRoutesState<T = any> {
	tagsViewRoutes: T[];
}
// 路由列表
declare interface RoutesListState<T = any> {
	routesList: T[];
}

// 布局配置
declare interface ThemeConfigState {
	themeConfig: {
		isCollapse: boolean;
	};
}
declare interface DesignerState {
	designer: {
		pageDataList: T[];
	};
}
