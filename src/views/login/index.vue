<template>
  <div class="login">
    <el-form class="conter" :model="form" :rules="rules" ref="form">
      <img class="imgcls" src="@/assets/common/login-logo.png" alt="" />
      <el-form-item prop="mobile">
        <el-input
          v-model="form.mobile"
          placeholder="请输入账号"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          @keyup.enter.native="btnclick"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="btnclick" class="btn" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mobilecheck } from '@/utils/validate'

export default {
  data () {
    return {
      form: {
        mobile: '13600000002',
        password: '123456'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              mobilecheck(value)
                ? callback()
                : callback(new Error('请输入正确的手机号'))
            },
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度不符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('user', ['getUserToken']),
    btnclick () {
      this.$refs.form.validate(async rus => {
        if (rus) {
          await this.getUserToken(this.form)
          this.$router.push('/dashboard')
          this.$message.success('登录成功')
        } else {
          this.$message.error('验证失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/common/login.jpg');
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .conter {
    width: 500px;
    height: 400px;
    // background-color: #fff;

    .imgcls {
      width: 100%;
      margin-bottom: 30px;
    }
    .btn {
      width: 100%;
      background: #4478ff;
      border-color: #4478ff;
    }
  }
}
</style>
