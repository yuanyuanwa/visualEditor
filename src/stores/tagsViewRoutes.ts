import { defineStore } from 'pinia';
import { Session } from '/@/utils/storage';
import { RouteRecordRaw } from 'vue-router';

/**
 * TagsView 路由列表
 * @methods setTagsViewRoutes 设置 TagsView 路由列表
 */

interface route<T = any> {
  path: T[];
  name: string;
  meta: {
    title: string
  };
}
export const useTagsViewRoutes = defineStore('tagsViewRoutes', {
  state: (): TagsViewRoutesState => ({
    tagsViewRoutes: [],
  }),
  actions: {
    async setTagsViewRoutes(data: Array<string>) {
      this.tagsViewRoutes = data;
    },
    // 添加一个新的tabsView
    async addVisitedTabsView(data: route) {
      if (this.tagsViewRoutes.find((n) => n.path === data.path)) {
        return
      }
      this.tagsViewRoutes.push({ name: data.meta.title, path: data.path })
      Session.set('tagsViewList', this.tagsViewRoutes);
    },
    // 关闭一个tabsView
    async delVisitedTabsView(data: route) {
      return new Promise((resolve, reject) => {
        this.tagsViewRoutes.forEach((item, index) => {
          if (item.name === data.name && item.path === data.path) this.tagsViewRoutes.splice(index, 1)
        })
        resolve([...this.tagsViewRoutes])
        Session.set('tagsViewList', this.tagsViewRoutes);

      })
    }
  },
});
