<template>
  <div class="setting">
    <el-card class="box-card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="addbtn" class="btn"
            >新增角色</el-button
          >
          <template>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="序号" width="100">
                <template v-slot="scope">
                  {{
                    (page.currentPage - 1) * page.pageSize + scope.$index + 1
                  }}
                </template>
              </el-table-column>

              <el-table-column
                prop="name"
                label="角色"
                width="300"
              ></el-table-column>
              <el-table-column
                prop="description"
                label="描述"
              ></el-table-column>
              <el-table-column label="操作">
                <template v-slot="scope">
                  <el-button type="success" @click="allotbtn(scope.row.id)"
                    >分配权限</el-button
                  >
                  <el-button type="primary" @click="editbtn(scope)"
                    >编辑</el-button
                  >
                  <el-button type="danger" @click="delbtn(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.currentPage"
              :page-sizes="[1, 5, 10, 20]"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-form label-width="100px" disabled>
            <el-form-item label="企业名称">
              <el-input v-model="companyList.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="companyList.companyAddress"></el-input>
            </el-form-item>
            <el-form-item label="公司电话">
              <el-input v-model="companyList.companyPhone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="companyList.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyList.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <add ref="add" :editID="editID" :mode="mode" @getsysRole="getsysRole"></add>
    <allot ref="allot"></allot>
  </div>
</template>

<script>
import add from './components/add'
import allot from './components/allot'
import { sysRoleget, companyget, sysroledel } from '@/api/setting'
export default {
  data () {
    return {
      activeName: 'first',
      mode: 'add', // 编辑与新增状态  默认新增
      formlist: '', // 当前页数据源
      editID: '',
      page: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页条数
        total: 1 // 总条数
      },
      tableData: [], // 角色列表数据源
      companyList: '' // 公司信息数据源
    }
  },
  components: {
    add,
    allot
  },
  created () {
    // 获取角色列表
    this.getsysRole()
  },
  methods: {
    // 点击分配权限
    allotbtn (id) {
      console.log(id)
      this.$refs.allot.allotShow = true
      this.$refs.allot.getallot(id)
    },
    // 删除角色
    delbtn (row) {
      console.log(row)
      this.$confirm('将永久删除角色', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(async () => {
          await sysroledel(row.id)
          this.$message.success('删除成功')
          this.page.currentPage = 1
          this.getsysRole()
        })
        .catch(() => {
          this.$message.error('已取消删除')
        })
    },
    // 打开编辑
    editbtn (scope) {
      console.log(scope)
      this.editID = scope.id
      this.$refs.add.form = this.form = JSON.parse(JSON.stringify(scope.row))
      this.$refs.add.isShow = true
      this.mode = 'edit'
    },
    // 打开新增窗口
    addbtn () {
      this.$refs.add.isShow = true
      this.mode = 'add'
    },
    // teb栏
    handleClick (value) {
      if (value.name === 'second') {
        this.getcompany()
      }
    },
    // 获取公司数据
    async getcompany () {
      if (this.companyList) {
        return
      } else {
        const res = await companyget(this.$store.getters.userInfo.companyId)
        console.log(res)
        this.companyList = res.data
      }
    },
    // 获取角色列表
    async getsysRole () {
      const res = await sysRoleget({
        page: this.page.currentPage,
        pagesize: this.page.pageSize
      })
      this.tableData = res.data.rows
      this.page.total = res.data.total
      console.log(res)
    },

    // 页容量更改触发
    handleSizeChange (size) {
      // console.log(num)
      this.page.pageSize = size

      this.getsysRole()
    },
    // 切换页码触发
    handleCurrentChange (num) {
      this.page.currentPage = num
      this.getsysRole()
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  .page {
    text-align: center;
    margin-top: 15px;
  }
  .btn {
    margin-bottom: 25px;
  }
  ::v-deep .el-table td,
  .el-table th.is-leaf {
    text-align: center;
  }
  ::v-deep .is-leaf {
    text-align: center;
  }
}
</style>
