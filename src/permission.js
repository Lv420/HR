import router from '@/router/index'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import store from '@/store/index'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const site = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  const token = getToken()
  // console.log(token)
  NProgress.start()
  if (token) {
    if (site.includes(to.path)) {
      Message.success('已登录,为您跳转到首页')
      next('/dashboard')
    } else {
      if (store.getters.islogin) {
        next()
      } else {
        await store.dispatch('user/getUserInfo')
        next()
      }
    }
  } else {
    if (site.includes(to.path)) {
      next()
    } else {
      Message.error('请重新登录')
      next('/login?redirect=' + to.fullPath)
    }
  }
  NProgress.done()
})

router.afterEach((to, from) => {
  NProgress.done() // 关闭进度条
})
