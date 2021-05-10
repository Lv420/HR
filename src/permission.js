import router from '@/router/index'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import store from '@/store/index'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

// const site = ['/login']
router.beforeEach(async (to, from, next) => {
  console.log(to)
  const token = getToken()
  // console.log(token)
  NProgress.start()
  if (!token) {
    if (to.path === '/login') {
      // console.log('123')
      next()
    } else {
      // console.log('13')
      Message.success('已退出登录')
      next(`/login?redirect=${to.fullPath}`)
    }
  } else {
    // console.log('1')
    if (to.path === '/login') {
      Message.success('已登录，为你跳转到首页')
      next('/dashboard')
    } else {
      if (store.getters.islogin) {
        next()
      } else {
        console.log(to)
        await store.dispatch('user/getUserInfo')
        console.log(111)
        await store.dispatch('permission/getUserRoutes')
        console.log(222)
        next(to.path) // to.fullpath也行
        // next()
      }
    }
  }
  0
  NProgress.done()
})

router.afterEach((to, from) => {
  NProgress.done() // 关闭进度条
})
