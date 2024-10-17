export const buttonBlur = (evt: any) => {
  let target = evt.target;
  if (target.nodeName == "SPAN") {
    target = evt.target.parentNode;
  }
  target.blur();
}
export const elsvgButtonBlur = (evt: any) => {
  let target = evt.target;
  if (target.nodeName == "SPAN" || target.nodeName == "IMG") {
    target = evt.target.parentNode.parentNode;
  } else if (target.nodeName == "use" || target.nodeName == "svg") {
    target = evt.target.parentNode.parentNode.parentNode
  } else if (target.nodeName == "path") {
    target = evt.target.parentNode.parentNode.parentNode.parentNode
  }
  target.blur();
}
export const svgButtonBlur = (evt: any) => {
  let target = evt.target;
  let target2 = evt.target;
  if (target.nodeName == "SPAN") {
    target = evt.target.parentNode.parentNode;
    target2 = evt.target.parentNode;
  } else if (target.nodeName == "IMG") {
    target = evt.target.parentNode.parentNode;
  } else if (target.nodeName == "svg") {
    target = evt.target.parentNode.parentNode
  } else if (target.nodeName == "use") {
    target = evt.target.parentNode.parentNode.parentNode;
  } else if (target.nodeName == "path") {
    target = evt.target.parentNode.parentNode.parentNode.parentNode
  }
  target.blur();
  target2.blur()
}

export const useDebounce = (fn: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const convertBase64UrlToBlob = (urlData: any) => {
  let bytes = window.atob(urlData.split(",")[1]); //去掉url的头，并转换为byte
  //处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  let name = ''
  return new File([ab], name, { type: 'image/jpg' })
  // return new Blob([ab], {
  //   type: "image/jpg",
  // });
}