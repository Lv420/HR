<template>
  <div class="employees">
    <PageTools>
      <template #left>
        <i class="el-icon-info iconcss" />
        <span>共16条记录</span>
      </template>
      <template #right>
        <div>
          <el-button type="success" @click="ExcelShow">导入</el-button>
          <el-button type="primary" @click="addbtn"
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
        <el-table-column label="序号" width="50">
          <template v-slot="scope">
            {{ (page.page - 1) * page.size + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="username" label="姓名" sortable>
        </el-table-column>
        <el-table-column label="头像" prop="staffPhoto">
          <template v-slot="{ row }">
            <img
              @click="clickcode(row.staffPhoto)"
              v-imgerror="errorimg"
              class="imgstyle"
              :src="row.staffPhoto"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" sortable>
        </el-table-column>
        <el-table-column prop="workNumber" label="工号" sortable>
        </el-table-column>
        <!-- 过滤方法1 -->
        <!-- <el-table-column
          prop="formOfEmployment"
          :formatter="formatterOf"
          label="聘用形式"
          sortable
        >
        </el-table-column> -->
        <!-- 过滤方法2 -->
        <el-table-column prop="formOfEmployment" label="聘用形式" sortable>
          <template v-slot="{ row }">
            <div>
              {{ +row.formOfEmployment | formatterOf }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="departmentName" label="部门" sortable>
        </el-table-column>
        <el-table-column prop="timeOfEntry" label="入职时间" sortable>
          <template v-slot="{ row }">
            <div>
              {{ row.timeOfEntry | formatTime }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="correctionTime" label="转正时间" sortable>
          <template v-slot="{ row }">
            <div>
              {{ row.correctionTime | formatTime }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="formOfEmployment" label="状态">
        </el-table-column>
        <el-table-column label="操作" width="290">
          <template v-slot="scope">
            <el-button type="text" @click="lookbtn(scope.row)">查看</el-button>
            <el-button type="text">转正</el-button>
            <el-button type="text">调岗</el-button>
            <el-button type="text">离职</el-button>
            <el-button type="text" @click="cosbtn(scope.row)">角色</el-button>
            <el-button type="text" @click="delbtn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="textcenter"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-sizes="[1, 5, 10, 20, 30, 40]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </el-card>
    <add ref="add"></add>
    <el-dialog class="canvas" title="生成二维码" :visible.sync="qrcodeShow">
      <canvas ref="code"></canvas>
    </el-dialog>
    <el-dialog title="角色分配" :visible.sync="cosShow" @close="closeEevent">
      <el-checkbox
        v-model="roleList"
        v-for="item in list"
        :key="item.id"
        :label="item.id"
        >{{ item.name }}</el-checkbox
      >
      <div slot="footer" class="dialog-footer">
        <el-button @click="cosShow = false">取 消</el-button>
        <el-button type="primary" @click="userSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import QrCode from 'qrcode'
// 导入api
import {
  sysuserget,
  sysuserdel,
  sysUserget,
  sysUserAssignRolesput
} from '@/api/employees'
import { sysRoleget } from '@/api/setting'
// import employees from '@/api/constant/employees'
import add from './components/add'
export default {
  data () {
    return {
      tableData: [],
      errorimg: require('@/assets/1.png'),
      qrcodeShow: false, // 二维码弹窗
      cosShow: false, // 角色分配弹窗
      list: [], // 角色数据
      roleList: [], // 已拥有的角色数据
      id: '',
      page: {
        page: 1,
        size: 10,
        total: 1
      }
    }
  },
  components: {
    add
  },
  created () {
    // 获取数据

    this.getuserdata()
  },
  filters: {
    // 过滤方法2
    // formatterOf (cellValue) {
    //   console.log(cellValue)
    //   // findIndex判断数组是否有这个值 item是遍历出来的数据
    //   let _index = employees.hireType.findIndex(item => {
    //     return item.id === cellValue
    //   })
    //   if (_index !== -1) {
    //     return employees.hireType[_index].value
    //   } else {
    //     return '未知'
    //   }
    // }
  },
  methods: {
    // 关闭角色窗口的回调
    closeEevent () {
      this.cosShow = false
      this.roleList = []
    },
    // 点击分配员工角色
    async userSave () {
      await sysUserAssignRolesput({
        id: this.id,
        roleIds: this.roleList
      })
      // console.log(res)
      this.$message.success('角色分配成功')
      this.closeEevent()
      // this.cosShow = false
    },
    // 点击打开角色分配弹框
    async cosbtn (row) {
      this.cosShow = true
      this.id = row.id
      const res = await sysRoleget()
      this.list = res.data.rows
      // console.log(res)
      const res1 = await sysUserget(row.id)
      console.log(res1)
      this.roleList = res1.data.roleIds
    },
    // 点击头像获取验证码
    clickcode (row) {
      console.log(row)
      if (row) {
        this.qrcodeShow = true
        this.$nextTick(() => {
          QrCode.toCanvas(this.$refs.code, row, {
            width: 200,
            height: 200
          })
        })
      } else {
        this.$message.error('抱歉,头像不存在')
      }
    },
    // 点击查看
    lookbtn (row) {
      console.log(row)
      this.$router.push(`/employees/lookover/${row.id}`)
    },
    // 点击打开excel页面
    ExcelShow () {
      this.$router.push('/employees/uploadExcel')
    },
    // 删除员工
    delbtn (row) {
      this.$confirm('确定删除吗?', '提示')
        .then(async () => {
          await sysuserdel(row.id)
          this.$message.success('删除成功')
          this.page.page = 1
          this.getuserdata()
        })
        .catch(() => {
          this.$message.error('删除取消')
        })
    },
    // 转换数据
    // 过滤方法1
    // formatterOf (row, column, cellValue, index) {
    //   console.log(row, column, cellValue, index)
    //   // findIndex判断数组是否有这个值 item是遍历出来的数据
    //   let _index = employees.hireType.findIndex(item => {
    //     return item.id === cellValue
    //   })
    //   if (_index !== -1) {
    //     return employees.hireType[_index].value
    //   } else {
    //     return '未知'
    //   }
    // },
    // 打开新增
    addbtn () {
      this.$refs.add.isShow = true
    },
    // 获取员工信息
    async getuserdata () {
      const res = await sysuserget(this.page)
      console.log(res)
      this.tableData = res.data.rows
      this.page.total = res.data.total
    },
    // 页容量改变触发
    handleSizeChange (size) {
      this.page.size = size
      this.getuserdata()
    },
    // 切换分页触发
    handleCurrentChange (page) {
      this.page.page = page

      this.getuserdata()
    }
  }
}
</script>

<style lang="scss" scoped>
.employees {
  padding: 15px;
  .canvas {
    text-align: center;
  }
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
    .imgstyle {
      width: 50px;
      height: 50px;
    }
  }
  .textcenter {
    text-align: center;
  }
}
</style>
