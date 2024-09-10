// aside
declare type AsideState = {
	menuList: RouteRecordRaw[];
	clientWidth: number;
};

// navBars breadcrumb
declare type BreadcrumbState<T = any> = {
	levelList: T[];
};

