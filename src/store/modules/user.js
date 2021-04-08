// 导入接口
import { loginapi, userinfoapi, sysuser } from '@/api/user'
// 导入操作token的方法
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  token: getToken(),
  userInfo: ''
}
const mutations = {
  setToken (state, value) {
    state.token = value
  },
  removeToken (state) {
    state.token = null
    removeToken()
  },
  setUserInfo (state, value) {
    state.userInfo = value
  },
  removeUserInfo (state) {
    state.userInfo = ''
  }
}
const actions = {
  // 登录接口获取token保存到vuex和cookies
  async getUserToken (state, form) {
    const res = await loginapi(form)

    state.commit('setToken', res.data)
    setToken(res.data)
    // console.log(res.data)
  },
  async getUserInfo (state) {
    const res = await userinfoapi()
    const restwo = await sysuser(res.data.userId)
    state.commit('setUserInfo', { ...res.data, ...restwo })
    // console.log(restwo)
    // console.log(res)
  },
  loginout (state) {
    state.commit('removeToken')
    state.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
