import router from '@/router/index'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const site = ['/login', '/404']
router.beforeEach((to, from, next) => {
  const token = getToken()
  NProgress.start()
  if (token) {
    if (site.includes(to.path)) {
      Message.success('已登录,为您跳转到首页')
      next('/dashboard')
    } else {
      next()
    }
  } else {
    if (site.includes(to.path)) {
      next()
    } else {
      Message.error('请重新登录')
      next('/login')
    }
  }
  NProgress.done()
})

router.afterEach((to, from) => {
  NProgress.done() // 关闭进度条
})
