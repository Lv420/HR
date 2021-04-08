import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import departments from './modules/departments'
import employees from './modules/employees'
import setting from './modules/setting'
import salarys from './modules/salarys'
import social from './modules/social'
import attendances from './modules/attendances'
import approvals from './modules/approvals'
import permission from './modules/permission'

export const constantRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/test',
    // component: () => import('@/views/test'),
    hidden: true
  },

  { path: '*', redirect: '/404', hidden: true }
]

const needControlRoutes = [
  departments,
  employees,
  setting,
  salarys,
  social,
  attendances,
  approvals,
  permission
]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constantRoutes, ...needControlRoutes]
  })

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
