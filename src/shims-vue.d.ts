//declare声明宣告， 声明一个ambient module(即:没有内部实现的 module声明) 
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
declare module 'dom-to-image'
declare module 'v3-drag-zoom'
declare module 'vue-drag-resize/src'
// xx即你包不能找到声明的包名