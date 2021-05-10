import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '@/store/index'
import router from '@/router/index'

const instens = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

// 添加请求拦截器
instens.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = getToken()
    // console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${getToken()}`
      // console.log(config)
    }

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
      // console.log(res.data)
      return res.data
    } else {
      Message.error(res.data.message)
      return Promise.reject(res.data.message)
    }
  },
  function (error) {
    // console.log([error])
    if (error.response.data && error.response.data.code === 10002) {
      store.dispatch('user/loginout')
      Message.error(error.response.data.message)
      router.push(`/login?redirect=${window.location.href.split('#')[1]}`)
    }
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
