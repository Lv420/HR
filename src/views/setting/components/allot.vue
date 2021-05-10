<template>
  <div>
    <el-dialog
      :visible.sync="allotShow"
      @close="closeAllotShow"
      title="权限分配"
    >
      <el-tree
        ref="tree"
        node-key="id"
        check-strictly
        show-checkbox
        default-expand-all
        :data="treeData"
        :props="{ label: 'name' }"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="allotShow = false">取 消</el-button>
        <el-button type="primary" @click="addAllot">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  syspermissionget,
  sysroleget,
  sysRoleAssignPrem
} from '@/api/permission'
import { treeChange } from '@/utils/index'
export default {
  data () {
    return {
      id: '', // 角色ID
      allotShow: false,
      treeData: [] // 树形结构数据
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 给角色分配权限
    async addAllot () {
      let allotarr = this.$refs.tree.getCheckedKeys()
      await sysRoleAssignPrem({ id: this.id, permIds: allotarr })
      this.$message.success('权限分配成功')
      this.allotShow = false
    },
    // 获取角色权限
    async getallot (id) {
      this.id = id
      const res = await sysroleget(id)
      //   console.log(res.data.permIds)
      this.$refs.tree.setCheckedKeys(res.data.permIds)
    },
    // 获取树形结构数据
    async getData () {
      const res = await syspermissionget()
      console.log(res)
      let treelist = res.data.filter(item => {
        return item.enVisible === '1'
      })
      this.treeData = treeChange(treelist, '0')
    },
    // 关闭弹窗
    closeAllotShow () {
      this.allotShow = false
    }
  }
}
</script>

<style></style>
