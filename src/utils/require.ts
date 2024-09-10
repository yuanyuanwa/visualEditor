/** vite的特殊性, 需要处理图片 */
const require_ = (imgPath: string) => {
  return new URL(`../assets/images/${imgPath}`, import.meta.url).href
  }
  
  export { require_ }
 