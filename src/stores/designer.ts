import { defineStore } from 'pinia';

export const useDesigner = defineStore('designer', {
  state: (): DesignerState => ({
    designer: {
      pageDataList: [],
    },
  }),
  actions: {
    setThemeConfig(data: DesignerState) {
      this.designer = data.designer;
    },
  },
});