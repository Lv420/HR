import pageTools from './pageTools/index.vue'
import uploadExcel from './uploadExcel/uploadExcel.vue'
import uploadimg from './uploadimg/index.vue'
export default {
  install: function (Vue) {
    Vue.component(pageTools.name, pageTools)
    Vue.component(uploadExcel.name, uploadExcel)
    Vue.component(uploadimg.name, uploadimg)
  }
}
