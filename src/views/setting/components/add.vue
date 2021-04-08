<template>
  <div class="add">
    <el-dialog
      :title="mode === 'add' ? '新增角色' : '编辑角色'"
      :visible.sync="isShow"
      @close="closeShow"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="角色名称" prop="name" label-width="100px">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description" label-width="100px">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button v-if="mode === 'add'" type="primary" @click="addbtn"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="editbtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { sysrolepost, sysRoleput } from '@/api/setting'
export default {
  props: ['mode', 'editID'],
  data () {
    return {
      isShow: false,
      form: {
        // form表单域
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    // 点击确认编辑
    async editbtn () {
      // console.log(this.editID)
      await sysRoleput(this.form)
      this.$message.success('编辑成功')
      this.closeShow()
      this.$emit('getsysRole')
      this.isShow = false
    },
    // 关闭窗口
    closeShow () {
      // 关闭将form表单域清空 两种办法都是清空
      this.$refs.form.resetFields()
      this.form = {
        name: '',
        description: ''
      }
    },
    // 点击新增角色
    async addbtn () {
      try {
        await this.$refs.form.validate()
        await sysrolepost(this.form)
        this.$message.success('新增成功')
        this.closeShow()
        this.$emit('getsysRole')
        this.isShow = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style></style>
