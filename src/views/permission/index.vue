<template>
  <div class="permission">
    <el-card>
      <el-button type="primary" @click="addbtn(1, '0')">新增页面</el-button>
      <el-table :data="list" row-key="id">
        <el-table-column prop="name" label="菜单名称"></el-table-column>
        <el-table-column prop="code" label="权限标识"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <div>
              <el-button type="text" @click="addbtn(2, row.id)"
                >添加权限点</el-button
              >
              <el-button type="text" @click="editbtn(3, row)">编辑</el-button>
              <el-button type="text" @click="delbtn(row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <add ref="add" @getData="getData"></add>
  </div>
</template>

<script>
import { syspermissionget, sysPermission } from '@/api/permission'
export default {
  data () {
    return {
      list: []
    }
  },
  components: {
    add: () => import('./components/add')
  },
  created () {
    this.getData()
  },
  methods: {
    // 点击编辑
    editbtn (type, row) {
      console.log(row)
      this.$refs.add.addShow = true
      this.$refs.add.editData(type, row)
    },
    // 删除权限点
    async delbtn (id) {
      try {
        await this.$confirm('此操作将永久删除权限点', '提示')
        await sysPermission(id)
        this.$message.success('已删除')
        this.getData()
      } catch (error) {
        this.$message.error('已取消删除')
      }
    },
    // 获取页面数据
    async getData () {
      const res = await syspermissionget()
      // console.log(res.data)
      // this.list = res.data
      this.list = this.getdata(res.data, '0')
      console.log(this.list)
      // this.getdata(res, '0')
    },
    // 打开新增弹窗
    addbtn (type, pid) {
      this.$refs.add.addShow = true
      this.$refs.add.formData(type, pid)
    },

    // 递归过滤树形结构
    getdata (arr, pid) {
      return arr.filter(item => {
        if (item.pid === pid) {
          item.children = this.getdata(arr, item.id)
          return true
        }
      })
    }
  }
}
</script>

<style></style>
