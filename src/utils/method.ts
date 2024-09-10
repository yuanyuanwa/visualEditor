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