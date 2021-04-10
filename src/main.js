import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import directives from '@/directives/index'
// 导入全局公用组件
import componentsJs from '@/components/index'
// 导入全局过滤器
import filtersUtils from '@/filters'

Object.keys(directives).forEach(item => {
  Vue.directive(item, directives[item])
})
Object.keys(filtersUtils).forEach(item => {
  Vue.filter(item, filtersUtils[item])
})

Vue.use(ElementUI, { locale })
Vue.use(componentsJs)

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
