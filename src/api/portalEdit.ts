import axios from "/@/api/dispose/index.js";

//上传图片
export const portalTemplateEditValueUploadImg = (data?: any,header?:any) => {
  return axios.request({
    url: '/portal/templateEditValue/uploadImg',
    data: data,
    headers: header,
    method: 'post',
  })
}
