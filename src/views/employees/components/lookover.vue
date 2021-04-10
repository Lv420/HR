<template>
  <div class="look">
    <el-card class="box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录账户设置" name="loginaccount">
          <el-form label-width="40px" :model="form" class="iptcenter">
            <el-form-item label="姓名">
              <el-input
                style="width:200%;"
                type="text"
                v-model="form.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                style="width:200%;"
                type="password"
                v-model="form.password"
              ></el-input>
            </el-form-item>
            <el-form-item class="center">
              <el-button type="primary" @click="updatebtn">更新</el-button>
              <el-button @click="$router.push('/employees')">返回</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人详情" name="particulars">
          <info></info>
        </el-tab-pane>
        <el-tab-pane label="岗位信息" name="post">
          <jobinfo></jobinfo>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { sysUserget, sysuserput } from '@/api/employees'

export default {
  components: {
    info: () => import('./userinfo'),
    jobinfo: () => import('./jobinfo')
  },

  data () {
    return {
      activeName: 'loginaccount',
      id: this.$route.params.id,
      putid: '',
      form: {
        username: '',
        password: ''
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // tab栏点击
    handleClick () {},
    // 获取员工信息
    async getUserInfo () {
      const res = await sysUserget(this.id)
      console.log(res)
      this.form = res.data
      this.putid = res.data.id
    },
    async updatebtn () {
      await sysuserput({ ...this.form, id: this.putid })
      this.$message.success('更新成功')
      this.$router.push('/employees')
    }
  }
}
</script>

<style lang="scss" scoped>
.look {
  padding: 10px;
  .box {
    .iptcenter {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      margin-right: 280px;
    }
    .center {
      text-align: center;
    }
  }
}
</style>
