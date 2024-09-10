import { RouteRecordRaw } from 'vue-router';
import { storeToRefs } from 'pinia';
import { router } from '/@/router/index';
import { dynamicRoutes } from '/@/router/route';
import pinia from '/@/stores/index';
import { Session } from '/@/utils/storage';
import { useRoutesList } from '/@/stores/routesList';


let permissions: any = []


export async function initFrontEndControlRoutes() {
  if (!Session.get('token')) return false;
  let routesList = await setFilterRouteEnd() //过滤完权限页面
  routesList.forEach((route: RouteRecordRaw) => {
    router.addRoute(route);
  });

  setFilterMenuAndCacheTagsViewRoutes(routesList);
}

function hasPermission(permissions: Array<any>, route: any) {
  if (route.meta && route.meta.permission) {
    return permissions.some(permission => {
      return route.meta.permission === permission
    })
  } else {
    return false;
  }
}

export function filterAsyncRoutes(dynamicRoutes: Array<any>, permissions: Array<any>) {
  let res: Array<Object> = [];
  dynamicRoutes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissions);
      }
      res.push(tmp)
    }
  });
  return res;
}
export function setFilterRouteEnd() {
  let filterRouteEnd: Array<any> = dynamicRoutes;
  // permissions = Session.get('permissions')
  // let filterRouteEnd: Array<any> = filterAsyncRoutes(dynamicRoutes, permissions);
  filterRouteEnd = filterRouteEnd.filter(item => {
    return item.children.length > 0
  })
  Session.set("menuList", filterRouteEnd);
  return filterRouteEnd;
}

export function setFilterMenuAndCacheTagsViewRoutes(routesList: Array<any>) {
  const storesRoutesList = useRoutesList(pinia);
  storesRoutesList.setRoutesList(routesList);
}


