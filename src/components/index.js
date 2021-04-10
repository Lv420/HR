import pageTools from './pageTools/index.vue'
import uploadExcel from './uploadExcel/uploadExcel.vue'
export default {
  install: function (Vue) {
    Vue.component(pageTools.name, pageTools)
    Vue.component(uploadExcel.name, uploadExcel)
  }
}
