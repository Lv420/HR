// 导入接口
import { loginapi } from '@/api/user'
// 导入操作token的方法
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  token: getToken()
}
const mutations = {
  setToken (state, value) {
    state.token = value
  },
  removeToken (state) {
    state.token = null
    removeToken()
  }
}
const actions = {
  // 登录接口获取token保存到vuex和cookies
  async getUserToken (sdate, form) {
    const res = await loginapi(form)
    sdate.commit('setToken', res.data)
    // console.log(res.data)
    setToken(res.data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
