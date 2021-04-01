<template>
  <div class="navbar">
    <div class="left">
      <i
        class="iconsize"
        :class="sidebar.opened ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
        @click="cutmenu"
      ></i>
      <!-- <i class="el-icon-s-fold"></i> -->
      <div>HR人力资源后台管理系统</div>
      <span>体验版</span>
    </div>
    <div class="right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img
            v-imgerror="imgsrc"
            :src="userInfo.data.staffPhoto"
            alt=""
          /><span>{{ userInfo.data.username }}</span
          ><i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      imgsrc: require('@/assets/common/1.png')
    }
  },
  computed: {
    // 控制菜单栏收起展开图标切换
    ...mapState('app', ['sidebar']),
    // 获取个人信息
    ...mapGetters(['userInfo'])
  },
  // directives: {
  //   imgerror: {
  //     inserted (el, obj) {
  //       el.onerror = function () {
  //         console.log(obj)
  //         el.src = obj.value
  //       }
  //     }
  //   }
  // },
  methods: {
    cutmenu () {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #5585fd;
  height: 50px;
  .left {
    display: flex;
    align-items: center;
    color: #fff;
    span {
      margin-left: 15px;
      background-color: #ccc;
      padding: 5px;
      border-radius: 5px;
      color: #5585fd;
    }
    .iconsize {
      font-size: 25px;
      margin: 0 25px 0 15px;
    }
  }
  .right {
    margin-right: 15px;
    .el-dropdown-link {
      color: #fff;
      display: flex;
      align-items: center;
    }
    span {
      margin: 0 10px;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
