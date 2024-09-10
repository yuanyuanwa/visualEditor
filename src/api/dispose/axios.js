import axios from 'axios'
import { Session } from '/@/utils/storage';

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
    this.withCredentials=true
  }

  getInsideConfig() {
    return {
      baseURL: this.baseUrl,
      timeout: 2000 * 1000,
      withCredentials:true,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'token': Session.get('token'),
      }
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      // if (res.status == 401 || res.status == 500) {
      //   window.location.reload()
      // }
      if (res.config.method === "delete") {
        return { status: res.status }
      } else {
        const { data, status, headers } = res
        return { data, status, headers }
      }
    }, error => {
      // if (error.response.status == 500 || error.response.status == 401) {
      //   window.location.reload()
      // }
      return Promise.reject(error)
    })
  }

  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest