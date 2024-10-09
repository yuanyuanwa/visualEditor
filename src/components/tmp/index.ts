import { ref, defineAsyncComponent, markRaw } from 'vue';

const modules = import.meta.glob('./*.vue');
const components = ref<Record<string, ReturnType<typeof defineAsyncComponent>>>({});
// const components: any = {}
Object.entries(modules).forEach(([path, asyncCom]: any) => {
  const name = path.match(/.*\/(.+).vue$/)[1];
  components.value[name] = markRaw(defineAsyncComponent(asyncCom));
  // components.value[name].name = name
  console.log(6, components.value[name].name)
});

export default components
