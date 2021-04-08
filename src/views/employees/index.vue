<template>
  <div class="employees">
    <PageTools>
      <template #left>
        <i class="el-icon-info iconcss" />
        <span>共16条记录</span>
      </template>
      <template #right>
        <div>
          <el-button type="success">导入</el-button>
          <el-button type="primary"
            ><span class="fontsize">+</span>新增员工</el-button
          >
        </div>
      </template>
    </PageTools>
    <el-card class="centent">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        border
        default-expand-all
      >
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="username" label="姓名" sortable>
        </el-table-column>
        <el-table-column label="头像"> </el-table-column>
        <el-table-column prop="mobile" label="手机号" sortable>
        </el-table-column>
        <el-table-column prop="workNumber" label="工号" sortable>
        </el-table-column>
        <el-table-column prop="formOfEmployment" label="聘用形式" sortable>
        </el-table-column>
        <el-table-column prop="departmentName" label="部门" sortable>
        </el-table-column>
        <el-table-column prop="timeOfEntry" label="入职时间" sortable>
        </el-table-column>
        <el-table-column prop="formOfEmployment" label="状态">
        </el-table-column>
        <el-table-column label="操作" width="300">
          <el-button type="text">查看</el-button>
          <el-button type="text">转正</el-button>
          <el-button type="text">调岗</el-button>
          <el-button type="text">离职</el-button>
          <el-button type="text">角色</el-button>
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 导入api
import { sysuserget } from '@/api/employees'
export default {
  data () {
    return {
      tableData: [],
      page: {
        page: 1,
        size: 10,
        total: 1
      }
    }
  },
  created () {
    this.getuserdata()
  },
  methods: {
    // 获取员工信息
    async getuserdata () {
      const res = await sysuserget(this.page)
      console.log(res)
      this.tableData = res.data.rows
      this.page.total = res.data.total
    },
    // 页容量改变触发
    handleSizeChange () {},
    // 切换分页触发
    handleCurrentChange () {}
  }
}
</script>

<style lang="scss" scoped>
.employees {
  padding: 15px;
  .iconcss {
    margin-right: 5px;
    color: #409eff;
  }
  .fontsize {
    font-size: 14px;
    margin-right: 3px;
  }
  .centent {
    margin-top: 15px;
  }
}
</style>
