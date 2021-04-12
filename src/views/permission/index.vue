<template>
  <div class="permission">
    <el-card>
      <el-button type="primary">新增页面</el-button>
      <el-table :data="list" row-key="id">
        <el-table-column prop="name" label="菜单名称"></el-table-column>
        <el-table-column prop="code" label="权限标识"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column label="操作">
          <el-button type="text">添加权限点</el-button>
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { syspermissionget } from '@/api/permission'
export default {
  data () {
    return {
      list: []
    }
  },
  async created () {
    const res = await syspermissionget()
    // console.log(res.data)
    this.list = this.getdata(res.data, '0')
    console.log(this.list)
    // this.getdata(res, '0')
  },
  methods: {
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
