<template>
  <div class="add">
    <el-dialog title="新增员工" :visible.sync="isShow" @close="closeShow">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="form.username" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker
            v-model="form.timeOfEntry"
            type="date"
            placeholder="请选择入职时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select
            v-model="form.formOfEmployment"
            placeholder="请选择聘用形式"
          >
            <el-option
              v-for="(item, index) in employees.hireType"
              :key="index"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input
            v-model="form.workNumber"
            placeholder="请输入工号"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-input
            v-model="form.departmentName"
            placeholder="选择部门"
            @focus="focus"
            readonly
          ></el-input>
          <el-tree
            v-if="treeShow"
            :data="treeData"
            :props="{ label: 'name', children: 'children' }"
            @node-click="treeclick"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker
            v-model="form.correctionTime"
            type="date"
            placeholder="请选择转正时间"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="addbtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mobilecheck } from '@/utils/validate'
import { sysuserpost } from '@/api/employees'
import employees from '@/api/constant/employees'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      isShow: false, // 弹窗开关
      employees: employees, // 聘用状态
      treeShow: false, // 默认隐藏树形结构
      form: {
        // 表单数据源
        username: '', //	string	非必须		姓名
        mobile: '', //	string	非必须		手机号
        formOfEmployment: '', //	number	非必须		聘用形式
        workNumber: '', //	string	非必须		工号
        departmentName: '', //	string	非必须		组织名称
        timeOfEntry: '', //	string	非必须		入职时间
        correctionTime: '' //	string	非必须		转正时间
      },
      rules: {
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }], //	string	非必须		姓名
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              mobilecheck(value)
                ? callback()
                : callback(new Error('请输入正确的手机号'))
            },
            trigger: 'blur'
          }
        ], //	string	非必须		手机号
        formOfEmployment: [
          { required: true, message: '请输入聘用形式', trigger: 'blur' }
        ], //	number	非必须		聘用形式
        workNumber: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ], //	string	非必须		工号
        departmentName: [
          { required: true, message: '请输入组织名称', trigger: 'change' }
        ], //	string	非必须		组织名称
        timeOfEntry: [
          { required: true, message: '请输入入职时间', trigger: 'change' }
        ], //	string	非必须		入职时间
        correctionTime: [
          { required: true, message: '请输入转正时间', trigger: 'change' }
        ] //	string	非必须		转正时间
      }
    }
  },
  created () {
    this.gettreeDepts()
  },
  computed: {
    ...mapState('departments', ['treeData'])
  },
  methods: {
    // 点击树形结构节点获取节点信息
    treeclick (data) {
      //   console.log(data)
      this.form.departmentName = data.name
      this.treeShow = false
    },
    ...mapActions('departments', ['gettreeDepts']),
    // 部门input获取焦点触发focus
    focus () {
      this.treeShow = true
    },
    // 关闭弹窗触发
    closeShow () {
      this.$refs.form.resetFields()
      this.form = {
        username: '', //	string	非必须		姓名
        mobile: '', //	string	非必须		手机号
        formOfEmployment: '', //	number	非必须		聘用形式
        workNumber: '', //	string	非必须		工号
        departmentName: '', //	string	非必须		组织名称
        timeOfEntry: '', //	string	非必须		入职时间
        correctionTime: '' //	string	非必须		转正时间
      }
    },
    created () {
      this.$parent('getuserdata')
    },
    // 确认新增
    async addbtn () {
      await this.$refs.form.validate()
      await sysuserpost(this.form)
      this.$message.success('新增成功')
      this.closeShow()
      this.isShow = false
    }
  }
}
</script>

<style></style>
