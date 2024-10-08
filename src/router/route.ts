import { RouteRecordRaw } from 'vue-router';
import Layout from '/@/layouts/layout/index.vue'

// 扩展 RouteMeta 接口
declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    permission?: string;
    src?: any;
    hidden?: boolean;
    tip?: string;
  }
}

//默认路由
export const dynamicRoutes: Array<RouteRecordRaw> = [];
export const notFoundAndNoPower = [
  {
    path: '/:path(.*)*',
    name: 'notFound',
    component: () => import('/@/views/error/404.vue'),
    meta: {
      title: '404',
      isHide: true,
    },
  }
];
export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('/@/views/edit/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/showPages',
    name: 'ShowPages',
    component: () => import('/@/views/showPages/index.vue'),
    meta: {
      title: '展示',
    },
  },
];
