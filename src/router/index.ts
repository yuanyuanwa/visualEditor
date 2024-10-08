import {
	createRouter,
	createWebHashHistory,
	createWebHistory,
} from 'vue-router'

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Session } from '/@/utils/storage';
import { staticRoutes, notFoundAndNoPower } from "/@/router/route";
import { initFrontEndControlRoutes } from './permission';

import pinia from '/@/stores/index';
import { storeToRefs } from 'pinia';
import { useRoutesList } from '/@/stores/routesList';
import axios from 'axios'

export const checkAppNewVersion = async () => {
	if (import.meta.env.VITE_MODE === 'development' || import.meta.env.VITE_MODE === 'production') return
	const url = import.meta.env.VITE_MODE == 'test' ? `/version.json?t=${Date.now()}` : `/version.json?t=${Date.now()}`
	let res = null
	try {
		res = await axios.get(url)
	} catch (err) {
		console.error('checkAppNewVersion error: ', err)
	}
	if (!res) return
	const version = res.data.version
	console.log(123, version, __APP_VERSION__)
	if (__APP_VERSION__ !== version) {
		// 有新版本，刷新页面
		console.log('有新版本，5秒后自动刷新页面');
		setTimeout(() => {
			window.location.reload()
		}, 1000)
	}
}


// 创建路由
export const router = createRouter({
	// 创建路由模式 history模式--createWebHashHistory 哈希模式--createWebHistory
	history: createWebHistory(import.meta.env.BASE_URL),
	// 配置路由规则
	routes: [...staticRoutes, ...notFoundAndNoPower],
})


const whiteList = ['/login', '/showPages', '/:path(.*)*', '/401'];

// function resetRouter() {
// 	router.getRoutes().forEach((route) => {
// 		const { name } = route;
// 		if (name && !whiteList.includes(name as string)) {      //路由不属于白名单,则删除
// 			router.hasRoute(name) && router.removeRoute(name);
// 		}
// 	});
// }

function getQueryVariable(variable: any) {
	var query = window.location.search.substring(1)
	var vars = query.split('&')
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=')
		if (pair[0] === variable) { return pair[1] }
	}
	return ''
}

// 路由加载前
router.beforeEach(async (to, from, next) => {
	checkAppNewVersion()
	NProgress.configure({ showSpinner: false });
	if (to.meta.title) NProgress.start();
	const token = Session.get('token');
	if (whiteList.indexOf(to.path) !== -1 && !token) {
		next();
		NProgress.done();
	} else {
		if (!token) {
			next('/login');
			NProgress.done();
		} else if (token && to.path === '/') {
			next('/');
			NProgress.done();
		} else {
			const storesRoutesList = useRoutesList(pinia);
			const { routesList } = storeToRefs(storesRoutesList);
			if (routesList.value.length === 0) {
				await initFrontEndControlRoutes();
				next({ path: to.path, query: to.query });
			} else {
				next();
			}
		}
	}
});

// 路由加载后
router.afterEach(() => {
	NProgress.done();
});

// 导出路由
export default router
