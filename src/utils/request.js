import axios from 'axios'
import { Message } from 'element-ui'

const instens = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

// 添加请求拦截器
instens.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instens.interceptors.response.use(
  function (res) {
    // 对响应数据做点什么
    if (res.data.success) {
      console.log(res.data)
      return res.data
    } else {
      Message.error(res.data.message)
      return Promise.reject(res.data.message)
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 拦截错误信息
function _ajax (req) {
  // console.log(req)
  return new Promise((resolve, reject) => {
    instens(req)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        if (!req.Catch) {
          reject(err)
          // console.log(err)
        }
      })
  })
}

export default _ajax
