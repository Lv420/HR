import { needControlRoutes, constantRoutes } from '@/router/index'
import router from '@/router/index'
// import Vue from 'vue'

const state = {
  routes: [...constantRoutes]
}
const mutations = {
  setRoutes (state, value) {
    state.routes = value
  }
}
const actions = {
  getUserRoutes (store) {
    // console.log(store)
    let _menus = store.rootGetters.userInfo.roles.menus
    // 过滤出来当前用户能访问的路由
    let newRoutes = needControlRoutes.filter(item => {
      return _menus.includes(item.children[0].name)
    })
    newRoutes = [...newRoutes, { path: '*', redirect: '/404', hidden: true }]
    store.commit('setRoutes', [...constantRoutes, ...newRoutes])

    // 加过滤出来的路由添加上去
    router.addRoutes(newRoutes)

    // console.log(newRoutes)
    // console.log(store)
    // console.log(needControlRoutes)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
