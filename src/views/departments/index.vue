<template>
  <div class="departments">
    <treechild :nodeData="topData" :isShow="false"></treechild>
    <div class="tree">
      <el-tree :data="treeData">
        <template v-slot="scope">
          <!-- 普通方法 -->
          <!-- <treechild :nodeData="scope.data" @getcompanyDepartment="getcompanyDepartment"></treechild> -->
          <!-- vuex方法 -->
          <treechild :nodeData="scope.data"></treechild>
        </template>
      </el-tree>
    </div>
    <!-- 普通方法 -->
    <!-- <add @getcompanyDepartment="getcompanyDepartment"></add> -->
    <!-- vuex方法 -->
    <add></add>
  </div>
</template>

<script>
import treechild from './components/treechild'
import add from './components/add'
// 导入API
// import { companyDepartment } from '@/api/departments'
// import { treeChange } from '@/utils'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      topData: {
        id: '',
        name: '人力资源部门管理',
        manager: '负责人'
      }
    }
  },
  components: {
    treechild,
    add
  },
  computed: {
    // 获取树形结构数据
    ...mapState('departments', ['treeData'])
  },
  created () {
    //  调用获取数据方法
    this.getcompanyDepartment()
  },

  methods: {
    //  调用获取数据方法
    async getcompanyDepartment () {
      // 调用action方法
      this.$store.dispatch('departments/gettreeDepts')

      // 普通方法
      // const res = await companyDepartment()
      // console.log(res)
      // this.treeDepts = res.data.depts
      // console.log(this.treeDepts)
      // this.treeData = treeChange(this.treeDepts, '')
    }
  }
}
</script>

<style lang="scss" scoped>
.departments {
  padding: 15px 50px;
  .tree {
    margin-top: 10px;
  }
}
</style>
