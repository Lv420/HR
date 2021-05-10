<template>
  <div class="add">
    <el-dialog
      :title="
        form.type === 1 ? '新增页面' : form.type === 2 ? '添加权限点' : '编辑'
      "
      :visible.sync="addShow"
      @close="closeEvent"
    >
      <el-form label-width="80px" :model="form" :rules="rules" ref="form">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="企业" prop="enVisible">
          <el-switch
            v-model="form.enVisible"
            active-value="1"
            inactive-value="0"
            active-text="可见"
            inactive-text="不可见"
          >
            >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addShow = false">取 消</el-button>
        <el-button
          v-if="form.type === 1 || form.type === 2"
          type="primary"
          @click="addbtn"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="editbtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { sysPermissionpost, sysPermissionput } from '@/api/permission'
export default {
  data () {
    return {
      addShow: false,

      form: {
        enVisible: '1', //	string	0为不启用，1为启用
        name: '', //	string 权限名称
        code: '', //	string 权限标识
        description: '', //	string 权限描述
        type: '',
        pid: ''
      },
      rules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }], //	string 权限名称
        code: [{ required: true, message: '必填', trigger: 'blur' }], //	string 权限标识
        description: [{ required: true, message: '必填', trigger: 'blur' }],
        enVisible: [{ required: true, message: '必填', trigger: 'change' }] //	string 权限描述
      }
    }
  },
  methods: {
    // 点击确认编辑
    async editbtn () {
      console.log('点击编辑')
      await sysPermissionput(this.form)
      this.$message.success('编辑成功')
      this.addShow = false
      this.closeEvent()
      this.$emit('getData')
    },
    // 点击确认新增
    addbtn () {
      this.$refs.form.validate(async req => {
        if (req) {
          await sysPermissionpost(this.form)
          this.$message.success('新增成功')
          this.addShow = false
          this.closeEvent()
          this.$emit('getData')
        } else {
          this.$message.error('请填写必填项')
        }
      })
    },
    // 获取type和pid
    formData (type, pid) {
      // console.log(type, pid)
      this.form.type = type
      this.form.pid = pid
    },
    editData (type, row) {
      this.form.type = type
      this.form = JSON.parse(JSON.stringify(row))
      console.log(this.form, (this.form.type = type))
    },
    // 关闭弹窗执行的回调
    closeEvent () {
      this.$refs.form.resetFields()
      this.form = {
        enVisible: '1', //	string	0为不启用，1为启用
        name: '', //	string 权限名称
        code: '', //	string 权限标识
        description: '' //	string 权限描述
      }
    }
  }
}
</script>

<style></style>
