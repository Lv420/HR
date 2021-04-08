<template>
  <div>
    <el-dialog
      :title="mode === 'edit' ? '修改部门' : '新增部门'"
      :visible.sync="isShow"
      center
      @close="close"
    >
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select
            placeholder="请选择"
            v-model="form.manager"
            @focus="getmanager"
          >
            <el-option
              v-for="(item, index) in managerlist"
              :key="index"
              :label="item.username"
              :value="item.username"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model="form.introduce"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isShow = false">取 消</el-button>

          <el-button v-if="mode === 'add'" @click="addclick" type="primary"
            >确 定</el-button
          >
          <el-button v-else @click="editclick" type="primary">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  sysuser,
  setcompanydepartment,
  companydepartment
} from '@/api/departments'
import { mapState } from 'vuex'
export default {
  // props: ['treeDepts'],
  computed: {
    ...mapState('departments', ['treeDepts'])
  },
  data () {
    return {
      isShow: false,
      mode: '', // 判断编辑/新增
      vnode: '', // 部门详情
      id: '', // 部门ID
      managerlist: [], // 负责人数据
      form: {
        // 表单数据源
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 1, max: 50, message: '名称长度不符合', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (this.mode === 'add') {
                this.treeDepts
                  .filter(item => item.pid === this.vnode.id)
                  .some(item => {
                    return item.name === value
                  })
                  ? callback(new Error('该部门已存在'))
                  : callback()
              } else {
                this.treeDepts
                  .filter(item => item.pid === this.vnode.pid)
                  .some(item => {
                    // console.log(item.id, this.vnode.id)
                    return item.name === value && item.id !== this.vnode.id
                  })
                  ? callback(new Error('该部门已存在'))
                  : callback()
              }
            },
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { min: 1, max: 50, message: '编码长度不符合', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (this.mode === 'add') {
                this.treeDepts.some(item => {
                  return item.code === value
                })
                  ? callback(new Error('该编码已存在'))
                  : callback()
              } else {
                this.treeDepts.some(
                  item => item.code === value && item.id !== this.vnode.id
                )
                  ? callback(new Error('该编码已存在'))
                  : callback()
              }
            },
            trigger: 'blur'
          }
        ],
        manager: [
          { required: true, message: '请选择负责人', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' },
          { min: 1, max: 300, message: '长度不符合', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    // 确认编辑
    async editclick () {
      const res = await companydepartment(this.form)
      console.log(res)
      this.$message.success('修改部门成功')
      this.isShow = false
      this.$store.dispatch('departments/gettreeDepts')
    },
    // 关闭弹窗触发
    close () {
      this.$refs.form.resetFields()
      this.form = {
        // 表单数据源
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    },
    // 获取负责人
    async getmanager () {
      if (this.managerlist.length === 0) {
        const res = await sysuser()
        this.managerlist = res.data.rows
        // console.log(this.managerlist)
      }
    },
    // 确认新增
    async addclick () {
      await setcompanydepartment({
        ...this.form,
        pid: this.vnode.id
      })
      this.isShow = false
      this.$message.success('新增成功')
      this.$store.dispatch('departments/gettreeDepts')
      // console.log(res)
    }
  },
  created () {
    this.$bus.$on('isShowEvent', data => {
      // console.log(data)
      this.mode = data[1]
      this.vnode = data[0]
      console.log(this.vnode)
      this.isShow = true
    }),
      this.$bus.$on('isMode', data => {
        this.mode = data[1]
        this.form = JSON.parse(JSON.stringify(data[0]))
        this.id = data[0].id
        this.vnode = data[0]
        // console.log(data)
        this.isShow = true
      })
  },
  // 销毁bus
  beforeDestroy () {
    this.$bus.$off('isShowEvent')
  }
}
</script>

<style></style>
