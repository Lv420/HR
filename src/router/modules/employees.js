import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employees/index'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: '/employees/uploadExcel',
      name: 'uploadExcel',
      hidden: true,
      component: () => import('@/views/employees/components/uploadExcel.vue')
    },
    {
      path: '/employees/lookover/:id',
      name: 'lookover',
      hidden: true,
      component: () => import('@/views/employees/components/lookover.vue')
    }
  ]
}
