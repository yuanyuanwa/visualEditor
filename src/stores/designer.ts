import { defineStore } from 'pinia';

export const useDesigner = defineStore('designer', {
  state: (): DesignerState => ({
    designer: {
      pageDataList: [],
      editItem:{},
    },
  }),
  actions: {
    setThemeConfig(data: DesignerState) {
      this.designer = data.designer;
    },
  },
});