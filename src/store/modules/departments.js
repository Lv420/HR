// 导入api
import { companyDepartment } from '@/api/departments'
import { treeChange } from '@/utils'

const state = {
  treeDepts: '', // 原始数据
  treeData: [] //  树形结构数据
}
const mutations = {
  settreeDepts (state, value) {
    state.treeDepts = value
  },
  settreeData (state, value) {
    state.treeData = value
  }
}
const actions = {
  // 获取数据源
  async gettreeDepts (state) {
    const res = await companyDepartment()
    // console.log(res)
    state.commit('settreeDepts', res.data.depts)
    let _depts = res.data.depts

    // this.treeDepts = res.data.depts
    // console.log(this.treeDepts)
    // console.log(store.state.treeDepts)
    state.commit('settreeData', treeChange(_depts, ''))
  }
  // gettreeData
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
